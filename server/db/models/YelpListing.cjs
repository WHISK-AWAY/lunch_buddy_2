const Sequelize = require('sequelize');
const db = require('../database.cjs');

const { STRING, INTEGER, FLOAT } = Sequelize;

const YelpListing = db.define('yelpListing', {
  id: {
    type: STRING,
    primaryKey: true,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
      notNull: true,
    },
  },
  name: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      notNull: true,
    },
  },
  imageUrl: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      notNull: true,
    },
  },
  url: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      notNull: true,
    },
  },
  reviewCount: {
    type: INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
      notNull: true,
    },
  },
  rating: {
    type: FLOAT,
    allowNull: false,
    validate: {
      notEmpty: true,
      notNull: true,
    },
  },
  phone: {
    type: STRING,
  },
  location: {
    type: STRING,
  },
  coordinates: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      notNull: true,
    },
  },
});

module.exports = YelpListing;
