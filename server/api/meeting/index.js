const router = require('express').Router();
const { Meeting, Message, Rating } = require('../../db/index.cjs');

router.post('/', async (req, res, next) => {
  try {
    const newMeeting = await Meeting.create({
      where: {
        userId: req.body.userId,
        buddyId: req.body.buddyId,
      },
    });
    res.status(200).json(newMeeting);
  } catch (err) {
    next(err);
    s;
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

router.get('/:meetingId', async (req, res, next) => {
  // REQUIRES ISADMIN MIDDLEWARE
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

router.delete('/:meetingId', async (req, res, next) => {
  // REQUIRES ISADMIN MIDDLEWARE
  try {
    await Meeting.Destroy({
      where: {
        id: req.params.meetingId,
      },
    });
    res.end();
  } catch (err) {
    next(err);
  }
});
router.get('/:meetingId/messages', async (req, res, next) => {
  // REQUIRES MIDDLEWARE
  try {
    const meeting = await Meeting.findByPk({
      where: {
        id: req.params.meetingId,
      },
      include: [
        {
          // not completly sure if I did that correctly might not need [] or maybe do
          model: 'message',
        },
      ],
    });

    if (meeting) {
      res.json(meeting);
    } else {
      res.status(404).send('Meeting not found with id ' + req.params.meetingId);
    }
  } catch (err) {
    next(err);
  }
});

router.post('/:meetingId/messages', async (req, res, next) => {
  // REQUIRES MIDDLEWARE
  try {
    const newMessage = await Message.create(req.body);
    // Not sure if we need to send the message back to the server
    // res.end()
    res.status(200).json(newMessage);
  } catch (err) {
    next(err);
    s;
  }
});

router.post('/:meetingId/rating', async (req, res, next) => {
  // Requires middleware???
  try {
    const rating = await Rating.create(req.body);
    res.status(200).json(rating);
  } catch (err) {
    next(err);
  }
});

router.put('/:meetingId/rating/:ratingId', async (req, res, next) => {
  // ADMIN MIDDLEWARE

  try {
    const rating = await Rating.update(
      { reportIsUpheld: true },
      {
        where: {
          id: req.params.ratingId,
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
