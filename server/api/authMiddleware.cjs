const { User } = require('../db/index.cjs');

// takes an auth header and uses it to verify logged in user
// pull in User model
// store funcs that act as middleware b/n request and response
// call next() w/o arg to move onto next piece of middleware

// requireToken (logged in user)
async function requireToken(req, res, next) {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(403).send('Must be logged in to access!');
    }
    const user = await User.verifyByToken(token);
    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
}

function sameUserOrAdmin(req, res, next) {
  if (
    req.user &&
    (req.user.id === +req.params.userId || req.user.role === 'admin')
  )
    next();
  else
    res
      .status(403)
      .send(
        'Inadequate access rights / Requested user does not match logged-in user'
      );
}

async function isAdmin(req, res, next) {
  try {
    if (!req.user) {
      return res.status(401).send('Must be signed in as admin');
    } else if (req.user.role !== 'admin') {
      return res.status(403).send('Inadequate access rights.');
    }
    next();
  } catch (err) {
    next(err);
  }
}

// isAdmin/role (admin priv) (req.user.isAdmin / req.user.role === ...)
module.exports = { requireToken, sameUserOrAdmin, isAdmin };
