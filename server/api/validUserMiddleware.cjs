const { User } = require('../db/index.cjs');

// Checks if the user passed in through params is in the db, if so continue
async function validUser(req, res, next) {
  try {
    const user = await User.findByPk(req.params.userId);
    if (!user) {
      res.status(404).send('Invalid user id, please try again.');
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
}

module.exports = validUser;
