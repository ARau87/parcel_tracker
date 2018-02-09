const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema({
  firstname: {type: String, required: true},
  lastname: {type: String, required: true},
  password: {type: String, required: true},
  created: {type: Date, default: Date.now()},
  city: {type: String, required: true},
});

mongoose.model('user', userSchema, 'user');
