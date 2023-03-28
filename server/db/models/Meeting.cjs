const Sequelize = require('sequelize');
const db = require('../database.cjs');

const User = require('./User.cjs');

const Meeting = db.define('meeting', {
  userId: {
    type: Sequelize.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
    allowNull: false,
    validate: {
      notNull: true,
      notEmpty: true,
    },
  },
  buddyId: {
    type: Sequelize.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
    allowNull: false,
    validate: {
      notNull: true,
      notEmpty: true,
    },
  },
  lunchDate: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW,
    validate: {
      notNull: true,
      notEmpty: true,
    },
  },
  yelpBusinessId: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  isClosed: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
    validate: {
      notNull: true,
      notEmpty: true,
    },
  },
  meetingStatus: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: 'pending',
    validate: {
      isIn: [['pending', 'confirmed', 'closed', 'cancelled']],
    },
  },
});

Meeting.beforeUpdate((meeting) => {
  if (meeting.meetingStatus === 'closed') meeting.isClosed = true;
  if (meeting.isClosed) meeting.meetingStatus = 'closed';
});

// Create new notification when meeting is created
Meeting.afterCreate((meeting) => {
  if (meeting.meetingStatus === 'pending') {
    meeting.createNotification({
      notificationType: 'meetingRequested',
      meetingId: meeting.id,
      userId: meeting.userId,
      buddyId: meeting.buddyId,
    });
  }
});

// Create new notification when meeting status is updated
Meeting.afterUpdate((meeting) => {
  // not sure what I have access to here -- how do I know which fields were changed and what they were changed from/to?
  console.log(meeting);
});

// Create new notification when pulling a meeting whose status is closed and a rating does not exist
// (not sure how to pull this one off just yet - PB)

module.exports = Meeting;
