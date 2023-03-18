const router = require('express').Router({ mergeParams: true });

router.get('/', (req, res, next) => {
  /**
   * GET /api/user/:userId/meeting
   * return a list of all meetings associated with userId
   */

  res.send(`hello from /api/user/${req.params.userId}/meeting`);
});

router.put('/:meetingId', (req, res, next) => {
  /**
   * PUT /api/user/:userId/meeting/:meetingId
   * update details of given meeting ID
   */
  res.send(
    `hello from /api/user/${req.params.userId}/meeting/${req.params.meetingId}`
  );
});

router.put('/:meetingId/cancel', (req, res, next) => {
  /**
   * PUT /api/user/:userId/meeting/:meetingId/cancel
   * set meeting status to 'closed'
   */

  res.send(
    `hello from /api/user/${req.params.userId}/meeting/${req.params.meetingId}/cancel`
  );
});

module.exports = router;
