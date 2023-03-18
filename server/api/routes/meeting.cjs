const router = require('express').Router();
const { Meeting, Message, Rating } = require('../../db/index.cjs');
const { requireToken, isAdmin } = require('../authMiddleware.cjs');

router.post('/', async (req, res, next) => {
  try {
    console.log(req.body.userId);
    const newMeeting = await Meeting.create(req.body);
    res.status(200).json(newMeeting);
  } catch (err) {
    next(err);
  }
});

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

router.get('/:meetingId', isAdmin, async (req, res, next) => {
  try {
    const meeting = await Meeting.findByPk(req.params.meetingId);

    if (meeting) {
      res.json(meeting);
    } else {
      res.status(404).send('Meeting not found with id ' + req.params.meetingId);
    }
  } catch (err) {
    next(err);
  }
});

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
router.get('/:meetingId/messages', async (req, res, next) => {
  const meeting = await Meeting.findByPk(req.params.meetingId);
  if (req.user.name === meeting.userId || req.user.name === meeting.buddyId) {
    try {
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
    } catch (err) {
      next(err);
    }
  } else {
    res.status(404).send('User is not found in meeting');
  }
});

router.post('/:meetingId/messages', async (req, res, next) => {
  const meeting = await Meeting.findByPk(req.params.meetingId);
  if (req.user.name === meeting.userId || req.user.name === meeting.buddyId) {
    try {
      const newMessage = await Message.create(req.body);
      res.status(200).json(newMessage);
    } catch (err) {
      next(err);
      s;
    }
  } else {
    res.status(404).send('User is not found in meeting');
  }
});

router.post('/:meetingId/rating', requireToken, async (req, res, next) => {
  const meeting = await Meeting.findByPk(req.params.meetingId);
  if (req.user.name === meeting.userId || req.user.name === meeting.buddyId) {
    try {
      const rating = await Rating.create(req.body);
      res.status(200).json(rating);
    } catch (err) {
      next(err);
    }
  } else {
    res.status(404).send('User is not found in meeting');
  }
});

router.put('/:meetingId/rating/:ratingId', isAdmin, async (req, res, next) => {
  try {
    const rating = await Rating.update(
      { reportIsUpheld: true },
      {
        where: {
          id: req.params.ratingId,
          iSReport: false,
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
