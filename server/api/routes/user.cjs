const router = require('express').Router();
// const {requireToken, isAdmin} = require('./authMiddleware.cjs');

const { User } = require('../../db/index.cjs');

router.get('/', async (req, res, next) => {
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
  res.send('hello');
});

router.get('/:userId', (req, res, next) => {
  /**
   * GET /api/user/:userId
   * return details of given user
   */
  res.send('hello');
});

router.put('/:userId', (req, res, next) => {
  /**
   * PUT /api/user/:userId
   * Update user profile (normal profile fields)
   */
  res.send('hello');
});

router.delete('/:userId', (req, res, next) => {
  /**
   * DELETE /api/user/:userId
   * Admin-only: delete user account
   */
  res.send('hello');
});

router.put('/:userId/location', (req, res, next) => {
  /**
   * PUT /api/user/:userId/location
   * Update user's lat/long location
   */
  res.send('hello');
});

// router.get('/:userId', (req, res, next) => {
//   console.log('req.params.userId:', req.params.userId);
//   res.send(req.params.userId);
// });

router.use('/:userId/meeting', require('./userMeeting.cjs'));

module.exports = router;
