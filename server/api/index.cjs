const router = require('express').Router();

// If api route isn't found

router.use('/meeting', require('./meeting/index.cjs'));

router.use((req, res, next) => {
  const err = new Error('API ROUTE NOT FOUND!');
  err.status = 404;
  next(err);
});

module.exports = router;
