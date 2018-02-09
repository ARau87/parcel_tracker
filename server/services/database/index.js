'use strict';
const mongoose = require('mongoose');
const config = require('../../config');

// Setting up the MongoDB database connection
const setup = () => {
  mongoose.Promise = global.Promise;
  mongoose.connect(config.MONGO_URI);

  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'MongoDB connection error: '))

  //SCHEMATA HERE
  require('./models/user');
  require('./models/parcel');
  require('./models/tracking_number');
}

module.exports = {
   setup
}
