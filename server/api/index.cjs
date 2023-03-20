const router = require('express').Router();

router.use('/auth', require('./routes/auth.cjs'));
router.use('/user', require('./routes/user.cjs'));
router.use('/tags', require('./routes/tags.cjs'));
router.use('/search', require('./routes/search.cjs'));

// If api route isn't found
router.use((req, res, next) => {
  const err = new Error('API ROUTE NOT FOUND!');
  err.status = 404;
  next(err);
});

module.exports = router;
