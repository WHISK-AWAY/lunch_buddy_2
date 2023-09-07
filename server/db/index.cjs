const db = require('./database.cjs');
const { Op } = require('sequelize');
const Category = require('./models/Category.cjs');
const Meeting = require('./models/Meeting.cjs');
const Message = require('./models/Message.cjs');
const Rating = require('./models/Rating.cjs');
const Tag = require('./models/Tag.cjs');
const User = require('./models/User.cjs');
const Notification = require('./models/Notification.cjs');
const YelpListing = require('./models/YelpListing.cjs');

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

YelpListing.hasMany(Meeting, {
  foreignKey: 'yelpBusinessId',
});
Meeting.belongsTo(YelpListing, {
  foreignKey: 'yelpBusinessId',
});

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

// Mark meeting as isClosed if status changes to cancelled or closed
Meeting.beforeUpdate((meeting) => {
  // if (meeting.isClosed) meeting.meetingStatus = 'closed';
  if (['cancelled', 'closed'].includes(meeting.meetingStatus)) {
    console.log('closing meeting...');
    meeting.isClosed = true;
  }
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
    }
  }, 3000);
});

// When a new notification is created for a demo user,
// automatically deal with it
Notification.afterCreate(async (notification) => {
  const toUser = await User.findByPk(notification.toUserId);
  if (toUser.email.slice(-10) === '@demo.demo') {
    console.log('---------------------Notification created for demo user');
    switch (notification.notificationType) {
      case 'meetingInvite':
        // acknowledge the notification & accept the invite
        await notification.update({ isAcknowledged: true });
        await Meeting.update(
          { meetingStatus: 'confirmed' },
          { where: { id: notification.meetingId }, individualHooks: true }
        );
        break;

      case 'inviteAccepted':
        // just acknowledge the notification
        await notification.update({ isAcknowledged: true });
        break;
      case 'inviteRejected':
        // just acknowledge the notification
        await notification.update({ isAcknowledged: true });
        break;
      case 'meetingCancelled':
        // just acknowledge the notification
        await notification.update({ isAcknowledged: true });
        break;
      case 'ratingRequested':
        // acknowledge the notification & submit rating
        await notification.update({ isAcknowledged: true });
        await Rating.create({
          userId: notification.toUserId,
          buddyId: notification.fromUserId,
          meetingId: notification.meetingId,
          rating: 4,
        });

        break;
      case 'currentMeeting':
        // don't do anything - this will auto-ack upon meeting close
        break;
      case 'newMessage':
        // acknowledge the notification
        console.log('new message received to dummy user');
        await Message.create({
          recipientId: notification.fromUserId,
          meetingId: notification.meetingId,
          message: 'Bloop bloop I am a robot',
          senderId: notification.toUserId,
        });
        setTimeout(async () => {
          await notification.update({ isAcknowledged: true });
        }, 1000);
        break;
    }
  }
});

// Close out relevant notifications when a meeting is closed
// Generate relevant notifications when a meeting is confirmed
Meeting.afterUpdate(async (meeting) => {
  if (meeting.isClosed) {
    console.log('updating notifications due to closed meeting...');
    const notifUpdates = await Notification.update(
      { isAcknowledged: true },
      {
        where: {
          notificationType: {
            [Op.in]: ['currentMeeting', 'inviteAccepted', 'newMessage'],
          },
          meetingId: meeting.id,
        },
      }
    );
  }

  if (
    meeting.changed().includes('meetingStatus') &&
    meeting._previousDataValues?.meetingStatus === 'pending' &&
    meeting.meetingStatus === 'confirmed'
  ) {
    await meeting.createNotification({
      toUserId: meeting.userId,
      fromUserId: meeting.buddyId,
      notificationType: 'inviteAccepted',
    });

    await meeting.createNotification({
      notificationType: 'ratingRequested',
      meetingId: meeting.id,
      fromUserId: meeting.userId,
      toUserId: meeting.buddyId,
    });

    await meeting.createNotification({
      notificationType: 'ratingRequested',
      meetingId: meeting.id,
      fromUserId: meeting.buddyId,
      toUserId: meeting.userId,
    });

    await meeting.createNotification({
      notificationType: 'currentMeeting',
      meetingId: meeting.id,
      fromUserId: meeting.buddyId,
      toUserId: meeting.userId,
    });

    await meeting.createNotification({
      notificationType: 'currentMeeting',
      meetingId: meeting.id,
      fromUserId: meeting.userId,
      toUserId: meeting.buddyId,
    });
  }
});

// Acknowledge current meeting after rating submitted
// Close out meeting after both people have submitted ratings
Rating.afterCreate(async (rating) => {
  const { userId, buddyId, meetingId } = rating;

  // acknowledge current meeting notification
  Notification.update(
    { isAcknowledged: true },
    {
      where: {
        toUserId: userId,
        meetingId: meetingId,
        notificationType: 'currentMeeting',
      },
    }
  );

  const oppositeRating = await Rating.findOne({
    where: { userId: buddyId, meetingId: meetingId },
  });
  // if we find an opposing rating, that means everyone's weighed in & it's time to close
  if (oppositeRating) {
    await Meeting.update(
      { meetingStatus: 'closed', isClosed: true },
      { where: { id: meetingId }, individualHooks: true }
    );
  }
});

// Send out message notification when message is created
Message.afterCreate(async (message) => {
  const { recipientId, senderId, meetingId } = message;
  setTimeout(() => {
    Notification.findOrCreate({
      where: {
        toUserId: recipientId,
        fromUserId: senderId,
        meetingId: meetingId,
        notificationType: 'newMessage',
        isAcknowledged: false,
      },
    });
  }, 2000);
});

module.exports = {
  Category,
  Meeting,
  Message,
  Rating,
  Tag,
  User,
  Notification,
  YelpListing,
};
