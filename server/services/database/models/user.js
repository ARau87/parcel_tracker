const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema({
  email: {type: String, required:true, unique: true},
  firstname: {type: String, required: true},
  lastname: {type: String, required: true},
  password: {type: String, required: true},
  created: {type: Date, default: Date.now()},
  city: {type: String, required: true},
  address: {type: String, required: true},
  postcode: {type: String, required: true},
  parcels: {type: [
    {trackingNr: {type: String, required:true}}
                  ], default: []}
});

mongoose.model('user', userSchema, 'user');
