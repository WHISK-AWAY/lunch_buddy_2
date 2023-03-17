const router = require('express').Router();
const { User } = require('../../db/index.cjs');
const { requireToken, isAdmin } = require('../authMiddleware.cjs');

// Route - /api/auth

router.get('/', requireToken, (req, res, next) => {
  try {
    res.send(req.user);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const token = await User.authenticate({ email, password });
    if (token) {
      return res.status(200).send({ token });
    } else {
      err = new Error('Username or password incorrect');
      err.status = 401;
      throw err;
    }
  } catch (err) {
    if (err.status === 401) return res.status(401).send('Bad credentials');
    next(err);
  }
});

module.exports = router;
