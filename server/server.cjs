const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv').config();
const volleyball = require('volleyball');
const bodyParser = require('body-parser');

const API_PORT = process.env.API_PORT;
const CORS_ALLOWED_ORIGINS = process.env.CORS_ALLOWED_ORIGINS;

// Body parsing middleware
app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

app.use(bodyParser.json({ limit: '50mb' }));
app.use(
  bodyParser.urlencoded({
    extended: true,
    limit: '50mb',
    parameterLimit: 50000,
  })
);
app.use(volleyball);

app.use(cors({ origin: CORS_ALLOWED_ORIGINS.split('|') }));

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
  app.listen(API_PORT, () => {
    console.log(`Server listening on port: ${API_PORT}`);
    console.log('Allowing CORS origins:', CORS_ALLOWED_ORIGINS.split('|'));
  });
}

init();

module.exports = app; // imported to mocha for tests
