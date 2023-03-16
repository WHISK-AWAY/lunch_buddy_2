const Sequelize = require('sequelize');
const db = require('../database');

const Rating = db.define('rating', {
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
  rating: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
      notNull: true,
      min: 1,
      max: 5,
    },
  },
  isReport: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
    validate: {
      notNull: true,
      notEmpty: true,
    },
  },
  reportComment: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notNull: true,
      notEmpty: true,
    },
  },
  reportIsUpheld: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
    validate: {
      notNull: true,
      notEmpty: true,
    },
  },
});

module.exports = Rating;
