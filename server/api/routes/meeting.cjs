const router = require('express').Router();
const { Meeting, Message, Rating } = require('../../db/index.cjs');
const { requireToken, isAdmin } = require('../authMiddleware.cjs');

// Don't belive needs middleware it'd be the server creating the meeting when needed
router.post('/', async (req, res, next) => {
  try {
    console.log(req.body.userId);
    const newMeeting = await Meeting.create(req.body);
    res.status(200).json(newMeeting);
  } catch (err) {
    next(err);
  }
});
// same case with above
router.put('/:meetingId', async (req, res, next) => {
  try {
    const meeting = await Meeting.findByPk(req.params.meetingId);

    if (meeting) {
      res.json(await Meeting.update(req.body));
    } else {
      res.status(404).send('Meeting not found with id ' + req.params.meetingId);
    }
  } catch (err) {
    next(err);
  }
});
// only admins can get full past meeting info
router.get('/:meetingId', isAdmin, async (req, res, next) => {
  try {
    const meeting = await Meeting.findByPk(req.params.meetingId);

    if (meeting) {
      res.json(meeting);
    } else {
      res.status(400).send('Meeting not found with id ' + req.params.meetingId);
    }
  } catch (err) {
    next(err);
  }
});
// only admins can remove past meetings
router.delete('/:meetingId', isAdmin, async (req, res, next) => {
  try {
    await Meeting.destroy({
      where: {
        id: req.params.meetingId,
      },
    });
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});
// want to check if user is logged in and user is in meeting
router.get('/:meetingId/messages', requireToken, async (req, res, next) => {
  try {
    const meeting = await Meeting.findByPk(req.params.meetingId);
    if (req.user.name === meeting.userId || req.user.name === meeting.buddyId) {
      const meeting = await Meeting.findByPk(req.params.meetingId, {
        include: {
          model: Message,
        },
      });
      if (meeting) {
        res.json(meeting);
      } else {
        res
          .status(404)
          .send('Meeting not found with id ' + req.params.meetingId);
      }
    } else {
      res.status(404).send('User is not found in meeting');
    }
  } catch (err) {
    next(err);
  }
});
router.post('/:meetingId/messages', requireToken, async (req, res, next) => {
  try {
    const meeting = await Meeting.findByPk(req.params.meetingId);
    if (req.user.name === meeting.userId || req.user.name === meeting.buddyId) {
      const newMessage = await Message.create(req.body);
      res.status(200).json(newMessage);
    } else {
      res.status(404).send('User is not found in meeting');
    }
  } catch (err) {
    next(err);
  }
});
// want to check if user is logged in and user is in meeting
router.post('/:meetingId/rating', requireToken, async (req, res, next) => {
  try {
    const meeting = await Meeting.findByPk(req.params.meetingId);
    if (req.user.name === meeting.userId || req.user.name === meeting.buddyId) {
      const rating = await Rating.create(req.body);
      res.status(200).json(rating);
    } else {
      res.status(404).send('User is not found in meeting');
    }
  } catch (err) {
    next(err);
  }
});

router.put('/:meetingId/rating/:ratingId', isAdmin, async (req, res, next) => {
  try {
    const rating = await Rating.update(
      { reportIsUpheld: true },
      {
        where: {
          id: req.params.ratingId,
          isReport: false,
        },
      }
    );
    if (rating) {
      res.status(200).json(rating);
    } else {
      res.status(404).send('Rating not found with id ' + req.params.ratingId);
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
