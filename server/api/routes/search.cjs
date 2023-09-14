const router = require('express').Router();
const { User, Tag, Category, YelpListing } = require('../../db/index.cjs');
const { requireToken } = require('../authMiddleware.cjs');
const { Op } = require('sequelize');
const geolib = require('geolib');
const dotenv = require('dotenv').config();
const axios = require('axios');

const { SAFE_USER_FIELDS } = require('../../constants.cjs');
const YELP_API_KEY = process.env.YELP_API_KEY;
const MAPS_API_KEY = process.env.MAPS_API_KEY;

const milesToMeters = (miles) => {
  const metersPerMile = 1609.344;
  const meters = miles * metersPerMile;
  return meters;
};

router.get('/', requireToken, async (req, res, next) => {
  try {
    if (!req.user.lastLat || !req.user.lastLong) {
      return res.status(400).json({ message: 'No coordinates provided' });
    }

    //will need to pass radius in query later, for now set to 5miles as a default value
    const searchRadius = +req.query.radius || 5;

    const center = { latitude: req.user.lastLat, longitude: req.user.lastLong };

    //defining search radius coordinates
    const searchArea = geolib.getBoundsOfDistance(
      center,
      milesToMeters(searchRadius)
    );

    const usersInRange = await User.findAll({
      include: {
        model: Tag,
        include: { model: Category },
      },
      attributes: SAFE_USER_FIELDS,
      where: {
        status: 'active',
        id: { [Op.ne]: [+req.user.id] },
        [Op.and]: [
          {
            lastLong: {
              [Op.between]: [searchArea[0].longitude, searchArea[1].longitude],
            },
          },
          {
            lastLat: {
              [Op.between]: [searchArea[0].latitude, searchArea[1].latitude],
            },
          },
        ],
      },
    });

    const myUser = await User.findByPk(req.user.id, {
      include: { model: Tag, include: { model: Category } },
    });

    const myUserTags = myUser.tags.map((tag) => {
      return tag.id;
    });

    //iterate over each match, counting the amount of tags overlapping
    for (let i = 0; i < usersInRange.length; i++) {
      const buddyUser = usersInRange[i];

      const buddyRating = await buddyUser.avgRating();

      buddyUser.tagCount = 0;

      const buddyTags = buddyUser.tags.map((tag) => {
        return tag.id;
      });

      for (let tag of myUserTags) {
        if (buddyTags.includes(tag)) buddyUser.tagCount++;
      }

      //scale tag overlap count by buddy rating
      buddyUser.averageScore = (buddyUser.tagCount + 1) * (buddyRating + 1);
    }

    usersInRange.sort((a, b) => {
      return b.averageScore - a.averageScore;
    });

    // useful if you want to see the list of properly sorted matches
    // console.log(
    //   'sorted users',
    //   usersInRange.map((user) => {
    //     return { name: user.firstName, score: user.averageScore };
    //   })
    // );

    res.status(200).json(usersInRange);
  } catch (err) {
    next(err);
  }
});

/**
 * Search for restaurant suggestions based on category matching
 */
router.get('/restaurants', requireToken, async (req, res, next) => {
  try {
    const YELP_BASE_URL = 'https://api.yelp.com/v3/businesses/search';
    const { latitude, longitude, radius, open_now, categories } = req.query;

    const params = {
      latitude,
      longitude,
      radius: parseInt(milesToMeters(radius)),
      open_now,
      categories: categories.join(','),
    };

    console.log('fetching yelp results');

    let yelpRes = await axios.get(YELP_BASE_URL, {
      headers: {
        Authorization: 'Bearer ' + YELP_API_KEY,
        accept: 'application/json',
      },
      params,
    });

    // if we didn't return anything with the first try, try again w/no categories
    // TODO: set a lower limit on filtered results and use unfiltered to flesh out a decent-sized list
    if (!yelpRes.data?.businesses?.length) {
      console.log('No category-specific results -- trying again...');
      delete params.categories;
      yelpRes = await axios.get(YELP_BASE_URL, {
        headers: {
          Authorization: 'Bearer ' + YELP_API_KEY,
          accept: 'application/json',
        },
        params,
      });
    }

    console.log(
      `Yelp rate limit: ${yelpRes.headers['ratelimit-remaining']} remaining of ${yelpRes.headers['ratelimit-dailylimit']}`
    );

    res.status(200).json(yelpRes.data);

    if (yelpRes.data?.businesses?.length > 0)
      updateYelpStore(yelpRes.data.businesses);
  } catch (err) {
    next(err);
  }
});

/**
 * Send Google Maps API key to frontend for use in generating map
 *
 */

router.get('/mapKey', requireToken, (_, res) => {
  return res.status(200).json({ MAPS_API_KEY });
});

/**
 * Pull specific restaurant information to populate meeting request / notifications
 * Try local DB first & pull Yelp info only if none available locally
 */
router.get(
  '/restaurants/:yelpBusinessId',
  requireToken,
  async (req, res, next) => {
    try {
      const YELP_BY_BIZ_ID = 'https://api.yelp.com/v3/businesses/';

      const localResult = await YelpListing.findByPk(req.params.yelpBusinessId);

      // if we have a local result, we need to expand location & coordinates to match yelp API shape
      // then send on to user without requesting info from Yelp
      if (localResult) {
        ['location', 'coordinates'].forEach((key) => {
          localResult[key] = JSON.parse(localResult[key]);
        });

        return res.status(200).json(localResult);
      }

      // If we somehow don't have the restaurant info already, pull it from Yelp & save it for future requests
      const yelpRes = await axios.get(
        YELP_BY_BIZ_ID + req.params.yelpBusinessId,
        {
          headers: {
            Authorization: 'Bearer ' + YELP_API_KEY,
            accept: 'application/json',
          },
        }
      );

      updateYelpStore([yelpRes.data]);

      console.log(
        `Yelp rate limit: ${yelpRes.headers['ratelimit-remaining']} remaining of ${yelpRes.headers['ratelimit-dailylimit']}`
      );

      res.status(200).json(yelpRes.data);
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;

function updateYelpStore(yelpListings) {
  /**
   * Given an array of yelp business listings, save (or update) each in database
   */
  if (!Array.isArray(yelpListings))
    throw new Error('must provide an array of listings');

  for (let listing of yelpListings) {
    const {
      id,
      name,
      image_url,
      url,
      review_count,
      rating,
      display_phone,
      location,
      coordinates,
    } = listing;

    YelpListing.findOrCreate({
      where: {
        id,
      },
      defaults: {
        id,
        name,
        imageUrl: image_url,
        url,
        reviewCount: review_count,
        rating,
        phone: display_phone,
        location: JSON.stringify(location),
        coordinates: JSON.stringify(coordinates),
      },
    })
      .then(([_, created]) => {
        if (created) {
          return;
        }
        YelpListing.update(
          {
            name,
            imageUrl: image_url,
            url,
            reviewCount: review_count,
            rating,
            phone: display_phone,
            location: JSON.stringify(location),
            coordinates: JSON.stringify(coordinates),
          },
          {
            where: {
              id,
            },
          }
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
