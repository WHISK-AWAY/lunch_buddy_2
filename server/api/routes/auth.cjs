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

router.get('/check-email', async (req, res, next) => {
  // return object containing boolean indicating whether email already exists
  // intended to be used during registration process for early validation

  // TODO: do checks (as well as registrations) in lowercase
  try {
    const { email } = req.query;

    if (!email)
      return res
        .status(400)
        .json({ message: 'Error: no e-mail address specified' });

    const emailCheck = await User.findOne({ where: { email } });

    return res.status(200).json({ emailExists: !!emailCheck });
  } catch (err) {
    console.log(err);
    next(err);
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
