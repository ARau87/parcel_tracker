'use strict';
const mongoose = require('mongoose');
const config = require('../../config');

const user = require('./user');

// Setting up the MongoDB database connection
const setup = (env) => {
  mongoose.Promise = global.Promise;

  // For the tests we will use a different database

  if(env === 'production'){
    mongoose.connect(config.MONGO_URI);
  }
  if(env === 'test'){
    mongoose.connect(config.MONGO_URI_TEST);
  }

  const db = mongoose.connection;
  db.on('error', console.log.bind(console, 'MongoDB connection error: '));

  //SCHEMATA HERE
  require('./models/user');
  require('./models/parcel');
  require('./models/tracking_number');

  // Create default admin user
  if('DEFAULT_ADMIN_USER' in config){
      user.create(config.DEFAULT_ADMIN_USER)
          .catch(err => console.log('[SERVER] Default Admin already in database'));
  }
}

// Disconnect from the mongodb database
const disconnect = () => {
  mongoose.connection.close();
}

module.exports = {
   setup,
   disconnect,
   user,
   parcel: require('./parcel'),
   trackingnr: require('./trackingnr')

}
