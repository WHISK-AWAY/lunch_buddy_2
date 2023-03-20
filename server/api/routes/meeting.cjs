const router = require('express').Router();
const { Meeting, Message, Rating } = require('../../db/index.cjs');
const { requireToken, isAdmin } = require('../authMiddleware.cjs');

router.post('/', requireToken, async (req, res, next) => {
  const { userId, buddyId } = req.body;
  const bodyKeys = { userId, buddyId };
  for (let key in bodyKeys) {
    if (bodyKeys[key] === undefined || bodyKeys[key] === null)
      delete bodyKeys[key];
  }
  try {
    const newMeeting = await Meeting.create(bodyKeys);
    res.status(200).json(newMeeting);
  } catch (err) {
    next(err);
  }
});

router.put('/:meetingId', requireToken, async (req, res, next) => {
  const { userId, buddyId, isClosed } = req.body;
  const bodyKeys = { userId, buddyId, isClosed };
  for (let key in bodyKeys) {
    if (bodyKeys[key] === undefined || bodyKeys[key] === null)
      delete bodyKeys[key];
  }
  try {
    const meeting = await Meeting.findByPk(req.params.meetingId);

    if (meeting) {
      res.json(await meeting.update(bodyKeys));
    } else {
      res.status(404).send('Meeting not found with id ' + req.params.meetingId);
    }
  } catch (err) {
    next(err);
  }
});
// only admins can get full past meeting info
router.get('/:meetingId', requireToken, isAdmin, async (req, res, next) => {
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
// only admins can remove past meetings
router.delete('/:meetingId', requireToken, isAdmin, async (req, res, next) => {
  try {
    const destroyCount = await Meeting.destroy({
      where: {
        id: req.params.meetingId,
      },
      limit: 1,
    });
    if (destroyCount > 0) {
      res.sendStatus(204);
    } else {
      res
        .status(404)
        .send(`meeting with ID ${req.params.meetingId} not foound`);
    }
  } catch (err) {
    next(err);
  }
});
// want to check if user is logged in and user is in meeting
router.get('/:meetingId/messages', requireToken, async (req, res, next) => {
  try {
    const meeting = await Meeting.findByPk(req.params.meetingId, {
      include: {
        model: Message,
      },
    });
    if (meeting) {
      if (
        req.user.id === meeting.userId ||
        req.user.id === meeting.buddyId ||
        req.user.role === 'admin'
      ) {
        res.json(meeting);
      } else {
        res.status(404).send('User is not found in meeting');
      }
    } else {
      res.status(404).send('Meeting not found with id ' + req.params.meetingId);
    }
  } catch (err) {
    next(err);
  }
});
// last one
router.post('/:meetingId/messages', requireToken, async (req, res, next) => {
  try {
    let correctRecip;
    const meeting = await Meeting.findByPk(req.params.meetingId);
    if (req.user.id === meeting.userId || req.user.id === meeting.buddyId) {
      if (req.user.id === meeting.userId) correctRecip = meeting.buddyId;
      else correctRecip = meeting.userId;
      const newMessage = await Message.create({
        recipientId: correctRecip,
        meetingId: req.params.meetingId,
        message: req.body.message,
        senderId: req.user.id,
      });
      res.status(200).json(newMessage);
    } else {
      res.status(404).send(`User is not in meeting ${req.params.meetingId}`);
    }
  } catch (err) {
    next(err);
  }
});
// want to check if user is logged in and user is in meeting
router.post('/:meetingId/rating', requireToken, async (req, res, next) => {
  try {
    const { isReport, reportComment } = req.body;
    const bodyKeys = { isReport, reportComment };
    for (let key in bodyKeys) {
      if (bodyKeys[key] === undefined || bodyKeys[key] === null)
        delete bodyKeys[key];
    }
    let correctRecip;
    const meeting = await Meeting.findByPk(req.params.meetingId);
    if (req.user.id === meeting.userId || req.user.id === meeting.buddyId) {
      if (req.user.id === meeting.userId) correctRecip = meeting.buddyId;
      else correctRecip = meeting.userId;
      const rating = await Rating.create({
        userId: req.user.id,
        buddyId: correctRecip,
        rating: req.body.rating,
        meetingId: req.params.meetingId,
        isReport: bodyKeys['isReport'],
        reportComment: bodyKeys['reportComment'],
      });
      res.status(200).json(rating);
    } else {
      res.status(404).send(`User is not in meeting ${req.params.meetingId}`);
    }
  } catch (err) {
    next(err);
  }
});

router.put(
  '/rating/:ratingId',
  requireToken,
  isAdmin,
  async (req, res, next) => {
    try {
      const rating = await Rating.update(
        { reportIsUpheld: req.body.reportIsUpheld },
        {
          where: {
            id: req.params.ratingId,
            isReport: true,
          },
        }
      );
      if (rating[0] !== 0) {
        res.status(200).json(rating);
      } else {
        res.status(404).send('Rating not found with id ' + req.params.ratingId);
      }
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
