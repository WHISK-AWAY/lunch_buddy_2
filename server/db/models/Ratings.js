const Sequelize = require('sequelize');
const db = require('../database');

const Rating = db.define('rating', {
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
      min: 30,
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
