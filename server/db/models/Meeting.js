const Sequelize = require('sequelize');
const db = require('../database');

const User = require('./User');

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
    defaultValue: DataTypes.NOW,
    validate: {
      notNull: true,
      notEmpty: true,
    },
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
});

module.exports = Meeting;
