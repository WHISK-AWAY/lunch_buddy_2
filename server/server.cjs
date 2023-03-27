const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv').config();
const volleyball = require('volleyball');
const PORT = process.env.PORT_NUMBER || 3000;

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(volleyball);

// TODO: tighten this up - all-permissive at the moment
app.use(cors());

app.get('/', (req, res, next) => {
  res.send('backend is running');
});

// Start of API routes
app.use('/api', require('./api/index.cjs'));

// Indicates server is running if user goes to this URL
app.use('/', (req, res, next) => {
  try {
    res.send('Backend is running');
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// Default error handling
app.use((err, req, res, next) => {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error');
});

async function init() {
  app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
  });
}

init();

module.exports = app; // imported to mocha for tests
