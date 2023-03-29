const router = require('express').Router({ mergeParams: true });
const { Notification, User, Meeting } = require('../../db/index.cjs');
const {
  requireToken,
  isAdmin,
  sameUserOrAdmin,
} = require('../authMiddleware.cjs');
const { SAFE_USER_FIELDS } = require('../../constants.cjs');

/**
 * GET /api/user/:userId/notifications
 * Pull all notifications addressed to requested user
 */
router.use('/', requireToken, sameUserOrAdmin, async (req, res, next) => {
  try {
    const userId = +req.params.userId;
    const notifications = await Notification.findAll({
      where: { toUserId: userId, isAcknowledged: false },
      include: [
        { model: User, as: 'toUser', attributes: SAFE_USER_FIELDS },
        { model: User, as: 'fromUser', attributes: SAFE_USER_FIELDS },
        { model: Meeting },
      ],
    });
    res.status(200).json(notifications);
  } catch (err) {}
});
/**
 * Situations:
 * User sends invite to buddy
 * Buddy responds (up or down)
 * User acknowledges response
 * Someone cancels
 * Other person acknowledges cancellation
 * User rating requested
 * User rating completed
 */

module.exports = router;
