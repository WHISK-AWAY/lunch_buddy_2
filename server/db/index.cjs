const db = require('./database.cjs');
const Category = require('./models/Category.cjs');
const Meeting = require('./models/Meeting.cjs');
const Message = require('./models/Message.cjs');
const Rating = require('./models/Rating.cjs');
const Tag = require('./models/Tag.cjs');
const User = require('./models/User.cjs');
const Notification = require('./models/Notification.cjs');

/**
 * ASSOCIATIONS
 */

User.belongsToMany(Tag, { through: 'user_tags' });
Tag.belongsToMany(User, { through: 'user_tags' });

Tag.belongsTo(Category);
Category.hasMany(Tag);

Meeting.belongsTo(User, { as: 'user', foreignKey: 'userId' });
Meeting.belongsTo(User, { as: 'buddy', foreignKey: 'buddyId' });
User.hasOne(Meeting);

Meeting.hasMany(Notification);
Notification.belongsTo(Meeting);

Notification.belongsTo(User, { as: 'toUser', foreignKey: 'toUserId' });
Notification.belongsTo(User, { as: 'fromUser', foreignKey: 'fromUserId' });
// User.hasMany(Notification);

/**
 * TODO: I commented out the senderId in messages model --
 * make sure the association/seeding works, and then go delete comments
 */
User.hasMany(Message, { foreignKey: 'senderId' });
Message.belongsTo(User, { foreignKey: 'senderId' });

Meeting.hasMany(Message);
Message.belongsTo(Meeting);

Meeting.hasMany(Rating);
Rating.belongsTo(Meeting);

Rating.belongsTo(User, { foreignKey: 'buddyId' });
User.hasMany(Rating, { foreignKey: 'buddyId' });

/**
 * USER INSTANCE METHODS
 * (placed here to avoid circular dependencies)
 */

User.prototype.avgRating = async function () {
  const scoreCount = await Rating.count({ where: { buddyId: this.id } });

  const scoreSum = await Rating.sum('rating', {
    where: { buddyId: this.id },
  });

  return scoreSum / scoreCount;
};

User.prototype.meetingCount = async function () {
  const userCount = await Meeting.count({ where: { userId: this.id } });
  const buddyCount = await Meeting.count({ where: { buddyId: this.id } });
  return userCount + buddyCount;
};

User.prototype.reportCount = async function () {
  const count = await Rating.count({
    where: { buddyId: this.id, isReport: true },
  });
  return count || 0;
};

User.prototype.strikeCount = async function () {
  const count = await Rating.count({
    where: { buddyId: this.id, isReport: true, isUpheld: true },
  });
  return count || 0;
};

module.exports = {
  Category,
  Meeting,
  Message,
  Rating,
  Tag,
  User,
  Notification,
};
