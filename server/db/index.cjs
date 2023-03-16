const Category = require('./models/Category.cjs');
const Meeting = require('./models/Meeting.cjs');
const Message = require('./models/Message.cjs');
const Rating = require('./models/Rating.cjs');
const Tag = require('./models/Tag.cjs');
const User = require('./models/User.cjs');

/**
 * ASSOCIATIONS
 */

module.exports = {
  Category,
  Meeting,
  Message,
  Rating,
  Tag,
  User,
};
