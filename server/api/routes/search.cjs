const router = require('express').Router();
const { User, Tag } = require('../../db/index.cjs');
const { isAdmin, requireToken } = require('../authMiddleware.cjs');
const { Op } = require('sequelize');
const geolib = require('geolib');

// const test = [
//   {
//     firstName: 'Liam',
//     lastName: 'Shelton',
//     email: 'lshelton0@gmail.com',
//     password: 'BJB6qr7fdsfsd4ee4',
//     age: 25,
//     gender: 'M',
//     address1: '2 Crest Line Pass',
//     address2: null,
//     city: 'Bronx',
//     state: 'NY',
//     lastLat: 40.678178,
//     lastLong: -73.944158,
//     zip: '10451',
//     avatarURL: '/src/assets/demoUserImg/M1.jpg',
//     aboutMe:
//       'As a journalist, I spend my days writing and researching stories. But when I am off, you can find me at the beach, practicing yoga, or trying out new restaurants in town.',
//     isVerified: true,
//     role: 'user',
//     status: 'active',
//   },
// ];
router.get('/', requireToken, async (req, res, next) => {
  try {
    const conversion = (miles) => {
      const metersPerMile = 1609.344;
      const meters = miles * metersPerMile;
      return meters;
    };

    const currentLocation = geolib.getBoundsOfDistance(
      { latitude: req.user.lastLat, longitude: req.user.lastLong },
      conversion(5)
    );
    // console.log('currentLocation', currentLocation);

    const userPosition = await User.findAll({
      include: {
        model: Tag,
      },
      where: {
        status: 'active',
        [Op.and]: [
          {
            lastLong: {
              [Op.between]: [
                currentLocation[0].longitude,
                currentLocation[1].longitude,
              ],
            },
          },
          {
            lastLat: {
              [Op.between]: [
                currentLocation[0].latitude,
                currentLocation[1].latitude,
              ],
            },
          },
        ],
      },
    });

    console.log('userPosition', userPosition);
    res.send();
  } catch (err) {
    next(err);
  }
});

module.exports = router;
