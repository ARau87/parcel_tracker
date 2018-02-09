const mongoose = require('mongoose');
const {Schema} = mongoose;

const parcelSchema = new Schema({

  trackingNr: {type: String, required: true},

  fromCity: {type: String, required: true},
  toCity: {type: String, required:true},

  // From and toName can either be a name of a person or a company name
  fromName: {type: String, required: true},
  toName: {type: String, required: true},

  // The firstname of to and from is either a person's firstname or 'Company' if
  // no firstname is given.
  fromFirstName: {type: String, default: 'Firma'},
  toFirstName: {type: String, default: 'Firma'},

  fromCityCode: {type: String, required:true},
  toCityCode: {type: String, required:true},

  fromAddress: {type: String, required: true},
  toAddress: {type:String, require:true},

  nextStep: {type: String, default: ''},
  previousSteps: {type: [{
    stepName: {type: String, required:true},
    stepDate: {type: Date, required: true}
  }], default: []},

  arrived: {type: Boolean, default: false}
});

parcelSchema.pre('save', next => {
  
})

mongoose.model('parcel', parcelSchema, 'parcel');
