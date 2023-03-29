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

/**
 * HOOKS
 */

Meeting.beforeUpdate((meeting) => {
  // if (meeting.isClosed) meeting.meetingStatus = 'closed';
  if (['cancelled', 'closed'].includes(meeting.meetingStatus))
    meeting.isClosed = true;
});

// Create new notification when meeting is created
Meeting.afterCreate(async (meeting) => {
  // delay for a moment to prevent fkey violation before meeting is fully created
  setTimeout(() => {
    if (meeting.meetingStatus === 'pending') {
      meeting.createNotification({
        notificationType: 'meetingInvite',
        meetingId: meeting.id,
        fromUserId: meeting.userId,
        toUserId: meeting.buddyId,
      });

      meeting.createNotification({
        notificationType: 'ratingRequested',
        meetingId: meeting.id,
        fromUserId: meeting.userId,
        toUserId: meeting.buddyId,
      });

      meeting.createNotification({
        notificationType: 'ratingRequested',
        meetingId: meeting.id,
        fromUserId: meeting.buddyId,
        toUserId: meeting.userId,
      });
    }
  }, 3000);
});

// Create new notification when meeting status is updated
// I backed off from this approach, but don't want to lose the code *just* yet
// Meeting.afterUpdate(async (meeting) => {
//   // when meeting status becomes 'cancelled', (via PUT /api/user/:userId/meeting/:meetingId/cancel)
//   // send cancellation notice if it was acknowledged
//   // send rejection notice if it was pending
//   if (
//     meeting.changed().includes('meetingStatus') &&
//     meeting.meetingStatus === 'cancelled'
//   ) {
//     console.log('meeting status changed:', meeting._previousDataValues);
//     // if was pending, send inviteRejected
//     await meeting.createNotification({
//       toUserId: notification.fromUserId,
//       fromUserId: notification.toUserId,
//       notificationType,
//     });
//     // if was confirmed, send meetingCancelled
//     const inviteNotification = await Notification.findOne({
//       where: {
//         meetingId: meeting.id,
//         notificationType: 'meetingInvite',
//         isAcknowledged: true,
//       },
//     });
//     // console.log('invite notification found: ', inviteNotification);
//     if (inviteNotification !== null)
//       await inviteNotification.update({ isAcknowledged: true });
//     console.log('ok we did it');
//   }
// });

Notification.afterUpdate(async (notification) => {
  // Create new notification when meeting request becomes acknowledged
  /**
   * TODO: change this into a Meeting.afterUpdate -- so that the front end needs only to
   * send an update of meeting status, and the notifications can be auto-acknowledged/generated
   */
  if (
    notification.changed().includes('isAcknowledged') &&
    notification.isAcknowledged &&
    notification.notificationType === 'meetingInvite'
  ) {
    const meeting = await Meeting.findByPk(notification.meetingId);
    let notificationType =
      meeting.meetingStatus === 'confirmed'
        ? 'inviteAccepted'
        : 'inviteRejected';
    meeting.createNotification({
      toUserId: notification.fromUserId,
      fromUserId: notification.toUserId,
      notificationType,
    });
  }
});

/**
 * Situations:
 * User sends invite to buddy
 * Buddy responds (up or down)
 * User acknowledges response
 * Someone cancels
 * Other person acknowledges cancellation
 * User rating requested
 * User rating completed
 */

module.exports = {
  Category,
  Meeting,
  Message,
  Rating,
  Tag,
  User,
  Notification,
};
