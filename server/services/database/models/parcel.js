const mongoose = require('mongoose');
const {Schema} = mongoose;

const parcelSchema = new Schema({

  trackingNr: {type: String, required: true, unique: true},

  fromCity: {type: String, required: true},
  toCity: {type: String, required:true},

  // From and toName can either be a name of a person or a company name
  fromName: {type: String, required: true},
  toName: {type: String, required: true},

  // The firstname of to and from is either a person's firstname or 'Company' if
  // no firstname is given.
  fromFirstName: {type: String, default: 'Firma'},
  toFirstName: {type: String, default: 'Firma'},

  fromPostCode: {type: String, required:true},
  toPostCode: {type: String, required:true},

  fromAddress: {type: String, required: true},
  toAddress: {type:String, require:true},

  steps: {type: [{
    stepLocation: {type: String, required: true},
    stepName: {type: String, required:true},
    stepDate: {type: Date, default: Date.now}
  } ], default: []},

  arrived: {type: Boolean, default: false}
});


mongoose.model('parcel', parcelSchema, 'parcel');
