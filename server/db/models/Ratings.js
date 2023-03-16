const Sequelize = require('sequelize');
const db = require('../database');

const Rating = db.define('rating', {
  rating: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notNull: true,
      min: 1,
      max: 5,
    },
  },
  isReport: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  reportComment: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      min: 30,
    },
  },
  reportIsUpheld: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = Rating;
