const router = require('express').Router({ mergeParams: true });
const { requireToken, sameUserOrAdmin } = require('../authMiddleware.cjs');
const validUser = require('../validUserMiddleware.cjs');
const Notification = require('../../db/index.cjs');

const { SAFE_USER_FIELDS } = require('../../constants.cjs');

/**
 * GET /api/user/:userId/notifications
 * return a list of all notifications associated with this user
 * (leave it to the front-end to filter out "read"/"closed" ones)
 */
router.get('/', requireToken, async (req, res, next) => {
  try {
    const userNotifications = await Notification.findAll({
      where: {},
    });
  } catch (err) {
    next(err);
  }
});
