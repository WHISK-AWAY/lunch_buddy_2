const Sequelize = require('sequelize');
const database_url =
  process.env.DATABASE_URL || `postgres://localhost:5432/lunch_buddy`;

const db = new Sequelize(
  // loads the correct database url based on NODE_ENV (default / dev / test)
  database_url,
  {
    logging: false,
  }
);

module.exports = db
