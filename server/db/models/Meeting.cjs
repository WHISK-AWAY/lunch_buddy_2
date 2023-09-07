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
  // yelpBusinessId: {
  //   type: Sequelize.STRING,
  //   allowNull: true,
  // },
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

module.exports = Meeting;
