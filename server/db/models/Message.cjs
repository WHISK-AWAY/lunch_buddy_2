const Sequelize = require('sequelize');
const db = require('../database.cjs');

const User = require('./User.cjs');
const Meeting = require('./Meeting.cjs');

const Message = db.define('message', {
  // senderId: {
  //   type: Sequelize.INTEGER,
  //   references: {
  //     model: User,
  //     key: 'id',
  //   },
  //   allowNull: false,
  //   validate: {
  //     notNull: true,
  //     notEmpty: true,
  //   },
  // },
  recipientId: {
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
  //further evaluation needed
  meetingId: {
    type: Sequelize.INTEGER,
    references: {
      model: Meeting,
      key: 'id',
    },
    allowNull: false,
    validate: {
      notNull: true,
      notEmpty: true,
    },
  },
  message: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notNull: true,
      notEmpty: true,
    },
  },
  isRead: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
    validate: {
      notNull: true,
      notNull: true,
    },
  },
});

module.exports = Message;
