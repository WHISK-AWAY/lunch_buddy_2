const Sequelize = require('sequelize');
const db = require('../database.cjs');

const Tag = db.define('tag', {
  tagName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      notNull: true,
    },
    unique: true,
  },
  yelpAlias: {
    type: Sequelize.STRING,
    allowNull: true,
    validate: {
      notEmpty: false,
      notNull: false,
    },
    unique: true,
  },
});

module.exports = Tag;
