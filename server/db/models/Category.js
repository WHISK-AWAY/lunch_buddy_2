const Sequelize = require('sequelize');
const db = require('../database');

const Category = db.define('category', {
  categoryName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isIn: [['social', 'professional', 'dietary restriction', 'cuisine']],
      notEmpty: true,
      notNull: true,
    },
    unique: true,
  },
});

module.exports = Category;
