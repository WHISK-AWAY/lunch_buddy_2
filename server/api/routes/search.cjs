const router = require('express').Router();
const { User, Tag, Category } = require('../../db/index.cjs');
const { requireToken } = require('../authMiddleware.cjs');
const { Op } = require('sequelize');
const geolib = require('geolib');
const dotenv = require('dotenv').config();
const axios = require('axios');

const YELP_API_KEY = process.env.YELP_API_KEY;

const milesToMeters = (miles) => {
  const metersPerMile = 1609.344;
  const meters = miles * metersPerMile;
  return meters;
};

router.get('/', requireToken, async (req, res, next) => {
  try {
    if (req.user.lastLat === null || req.user.lastLong === null) {
      res.status(400).send('No coordinates provided');
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
      attributes: [
        'firstName',
        'lastName',
        'fullName',
        'id',
        'gender',
        'avatarUrl',
        'aboutMe',
      ],
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

    let yelpRes = await axios.get(YELP_BASE_URL, {
      headers: {
        Authorization: 'Bearer ' + YELP_API_KEY,
        accept: 'application/json',
      },
      params,
    });

    // if we didn't return anything with the first try, try again w/no categories
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
      `Yelp rate limit: ${yelpRes.headers['ratelimit-remaining']}/${yelpRes.headers['ratelimit-dailylimit']}`
    );

    res.status(200).send(yelpRes.data);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
