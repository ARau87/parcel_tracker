'use strict';
const mongoose = require('mongoose');

// Create a new user
const create = async (user) => {
  const User = mongoose.model('user');
  if(user.email && user.firstname && user.lastname && user.password && user.city && user.postcode && user.address){
      let newUser = await new User({
        ...user
      });
      return newUser.save();
  }
}

// Delete all user in the database
const clear = async () => {
  const User = mongoose.model('user');

  await User.remove({});
}

// Change a user. To change a user his email must be provided
const set = async (identifier, options) => {
  const User = mongoose.model('user');

  if(identifier.email){
    return User.where(identifier)
               .updateOne({$set: {...options}})
               .exec();
  }
  else {
    return null;
  }
}

// Find a return a user from database. To get a user from database the email qoption
// as unique identifier needs to be provided
const get = async (identifier) => {
  const User = mongoose.model('user');

  if(identifier.email){
    return User.findOne(identifier);
  }
  else {
    return null;
  }
}

module.exports = {
  create,
  clear,
  set,
  get
}
