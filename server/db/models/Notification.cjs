const Sequelize = require('sequelize');
const db = require('../database.cjs');

const NOTIFICATION_TYPES = require('../../constants.cjs');

const Notification = db.define('notification', {
  notificationType: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notNull: true,
      notEmpty: true,
      isIn: [NOTIFICATION_TYPES],
    },
  },
});

module.exports = Notification;
