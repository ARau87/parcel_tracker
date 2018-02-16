'use strict';
const mongoose = require('mongoose');

// Clear parcel collection
const clear = async () => {
  const Parcel = mongoose.model('parcel');

  return Parcel.remove({});
}

// Create a new document in the parcel collection
const create = async (parcel) => {
  const Parcel = mongoose.model('parcel');

  if(parcel.trackingNr && parcel.toName && parcel.fromName && parcel.toFirstName && parcel.fromFirstName && parcel.toCity && parcel.fromCity && parcel.toPostCode && parcel.fromPostCode && parcel.toAddress && parcel.fromAddress){
    let newParcel = new Parcel({...parcel});
    return newParcel.save();
  }
  else {
    return null;
  }
}

// Get a parcel document with the specified parameters
const get = async (identifier) => {
  const Parcel = mongoose.model('parcel');

  if(identifier.trackingNr){
    let parcel = await Parcel.findOne({...identifier});
    return parcel;
  }
  else {
    return null;
  }

}

// Update the parcel with the specified trackingNr
const set = async (identifier, updateParams) => {
  const Parcel = mongoose.model('parcel');

  if(identifier.trackingNr){
    return Parcel.where(identifier)
          .updateOne({$set: updateParams})
          .exec();
  }
  else {
    return null;
  }
}

// Add a step to the list of steps. The parcel to add a step to needs to specified
// by a trackingNr
const addStep = async (identifier, step) => {
  const Parcel = mongoose.model('parcel');

  // Validate the parameters
  if(identifier.trackingNr){
    if(step.stepLocation && step.stepName){

      // Check if the parcel is available
      if(await get(identifier)){
        return Parcel.updateOne(identifier, {$push: {steps: step}});
      }
      else {
        return null;
      }

    }
    else {
      return null;
    }
  }
  else {
    return null;
  }

}

module.exports = {

  clear,
  create,
  get,
  set,
  addStep

}
