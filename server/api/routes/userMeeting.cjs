const router = require('express').Router({ mergeParams: true });
const { Meeting } = require('../../db/index.cjs');
const { requireToken, sameUserOrAdmin } = require('../authMiddleware.cjs');

router.get('/', requireToken, sameUserOrAdmin, async (req, res, next) => {
  /**
   * GET /api/user/:userId/meeting
   * return a list of all meetings associated with userId
   */
  try {
    const userMeetings = await Meeting.findAll({
      where: {
        userId: req.params.userId,
      },
    });
    res.status(200).json(userMeetings);
  } catch (error) {
    console.error('Error retrieving meetings, please try again later.');
    next(error);
  }
});

router.get(
  '/:meetingId',
  requireToken,
  sameUserOrAdmin,
  async (req, res, next) => {
    /**
     * GET /api/user/:userId/meeting/:meetingId
     * get details of a single meeting
     */
    try {
      const meeting = await Meeting.findByPk(req.params.meetingId);
      if (!meeting) {
        return res.status(404).send('No meeting found.');
      } else if (req.user.id !== meeting.userId && req.user.role !== 'admin') {
        res.status(403).send('You are unable to view this meeting.');
      } else {
        res.status(200).json(meeting);
      }
    } catch (error) {
      console.error(
        'Error trying to view meeting date. Please try again later.'
      );
      next(error);
    }
  }
);

router.put(
  '/:meetingId/date',
  requireToken,
  sameUserOrAdmin,
  async (req, res, next) => {
    /**
     * PUT /api/user/:userId/meeting/:meetingId/date
     * update date of given meeting ID
     */
    const { lunchDate } = req.body;
    try {
      const meeting = await Meeting.findByPk(req.params.meetingId);
      if (!meeting) {
        return res.status(404).send('No meeting found to update.');
      } else if (req.user.id !== meeting.userId && req.user.role !== 'admin') {
        res.status(403).send('You are unable to edit this meeting.');
      } else {
        const updatedMeeting = await meeting.update({ lunchDate });
        res.status(200).json(updatedMeeting);
      }
    } catch (error) {
      console.error(
        'Error trying to change meeting date. Please try again later.'
      );
      next(error);
    }
  }
);

router.put(
  '/:meetingId/cancel',
  requireToken,
  sameUserOrAdmin,
  async (req, res, next) => {
    /**
     * PUT /api/user/:userId/meeting/:meetingId/cancel
     * set meeting status to 'closed'
     */
    try {
      const meeting = await Meeting.findByPk(req.params.meetingId);
      if (!meeting) {
        return res.status(404).send('No meeting found to update.');
      } else if (req.user.id !== meeting.userId && req.user.role !== 'admin') {
        res.status(403).send('You are unable to edit this meeting.');
      } else {
        const updatedMeeting = await meeting.update({ isClosed: true });
        res.status(200).json(updatedMeeting);
      }
    } catch (error) {
      console.error(
        'Error trying to change meeting date. Please try again later.'
      );
      next(error);
    }
  }
);

module.exports = router;
