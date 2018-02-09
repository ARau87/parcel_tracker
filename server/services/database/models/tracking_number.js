const mongoose = require('mongoose');
const {Schema} = mongoose;

const trackingNrSchema = new Schema({
  trackingNr: {type: String, required: true},
  randomKey: {type: String, required: true}
});

mongoose.model('tracking_nr', trackingNrSchema, 'tracking_nr');
