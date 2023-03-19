const router = require('express').Router();
const { User, Tag } = require('../../db/index.cjs');
const { isAdmin, requireToken } = require('../authMiddleware.cjs');
const { Op } = require('sequelize');
const geolib = require('geolib');

router.get('/', requireToken, async (req, res, next) => {
  try {
    if (req.user.lastLat === null || req.user.lastLong === null) {
      res.status(400).send('No current position found');
    }

    const milesToMeters = (miles) => {
      const metersPerMile = 1609.344;
      const meters = miles * metersPerMile;
      return meters;
    };

    const searchArea = geolib.getBoundsOfDistance(
      { latitude: req.user.lastLat, longitude: req.user.lastLong },
      milesToMeters(5)
    );

    const usersInRange = await User.findAll({
      include: {
        model: Tag,
      },
      where: {
        status: 'active',
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

    res.status(200).json(usersInRange);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
