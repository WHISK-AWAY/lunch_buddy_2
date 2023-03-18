const router = require('express').Router();
const {
  requireToken,
  isAdmin,
  sameUserOrAdmin,
} = require('../authMiddleware.cjs');

const { User, Tag } = require('../../db/index.cjs');

router.get('/', requireToken, isAdmin, async (req, res, next) => {
  /**
   * GET /api/user
   * Admin-only: return a listing of all users
   */
  try {
    /**
     * TODO: pagination
     */
    const allUsers = await User.findAll({
      attributes: {
        exclude: ['password'],
      },
    });
    res.status(200).json(allUsers);
  } catch (err) {
    next(err);
  }
});

router.post('/', (req, res, next) => {
  /**
   * POST /api/user
   * Create new user
   */
  try {
    // destructure to filter out any other weird things that might be
    // passed along on the body object
    const {
      firstName,
      lastName,
      email,
      password,
      age,
      gender,
      address1,
      address2,
      city,
      state,
      zip,
      avatarUrl,
      aboutMe,
      tags,
    } = req.body;

    const newUserData = {
      firstName,
      lastName,
      email,
      password,
      age,
      gender,
      address1,
      address2,
      city,
      state,
      zip,
      avatarUrl,
      aboutMe,
    };

    res.send('hello');
  } catch (err) {
    next(err);
  }
});

router.get(
  '/:userId',
  requireToken,
  sameUserOrAdmin,
  async (req, res, next) => {
    /**
     * GET /api/user/:userId
     * return details of given user
     */
    try {
      const userId = +req.params.userId;

      const user = await User.findByPk(userId, {
        include: [Tag],
        attributes: {
          exclude: ['password', 'avgRating', 'reportCount', 'strikeCount'],
        },
      });

      if (!user) return res.status(404).send(`No such user id: ${userId}`);
      res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  }
);

router.put('/:userId', (req, res, next) => {
  /**
   * PUT /api/user/:userId
   * Update user profile (normal profile fields)
   */
  res.send('hello');
});

router.delete('/:userId', requireToken, isAdmin, async (req, res, next) => {
  /**
   * DELETE /api/user/:userId
   * Admin-only: delete user account
   */
  try {
    const userId = +req.params.userId;

    const destroyCount = await User.destroy({
      where: { id: userId },
      limit: 1,
    });

    if (destroyCount > 0) return res.sendStatus(204);
    else return res.status(404).send('Nothing deleted: no matching user found');
  } catch (err) {
    next(err);
  }
});

router.put(
  '/:userId/location',
  requireToken,
  sameUserOrAdmin,
  async (req, res, next) => {
    /**
     * PUT /api/user/:userId/location
     * Update user's lat/long location
     */
    try {
      const { lat, long } = req.body;
      const userId = +req.params.userId;

      if (lat === undefined || long === undefined) {
        return res
          .status(400)
          .send('Cannot update location: missing parameters');
      }

      const thisUser = await User.findByPk(userId, {
        attributes: {
          exclude: ['password'],
        },
      });
      if (!thisUser)
        return res.status(404).send('Cannot update location: user not found');

      await thisUser.update({ lastLat: lat, lastLong: long });
      res.status(200).send(thisUser);
    } catch (err) {
      next(err);
    }
  }
);

// router.get('/:userId', (req, res, next) => {
//   console.log('req.params.userId:', req.params.userId);
//   res.send(req.params.userId);
// });

router.use('/:userId/meeting', require('./userMeeting.cjs'));

module.exports = router;
