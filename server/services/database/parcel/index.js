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
    let newParcel = new Parcel({...parcel, nextStep:{}, steps:[]});
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
    return Parcel.where({trackingNr: identifier.trackingNr})
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

      let parcel = await get(identifier);

      // Check if the parcel is available
      if(parcel){

        if(parcel.nextStep && parcel.nextStep.stepName && parcel.nextStep.stepLocation && parcel.nextStep.stepType){
            await set(parcel, {nextStep: step});

            return Parcel.updateOne(identifier, {$push: {steps: parcel.nextStep}});
        }
        else {
            await set(parcel, {nextStep: step});
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
  else {
    return null;
  }

}

// Set the parcel to arrived and the push the nextStep to the steps array
const end = async (identifier) => {
    const Parcel = mongoose.model('parcel');

    if(identifier && identifier.trackingNr){

        let parcel = await get(identifier);


        if(parcel){
            await set(parcel, {arrived: true});


            await Parcel.updateOne(identifier, {$push: {steps: parcel.nextStep}});

            return await Parcel.updateOne(identifier, {$unset: {nextStep: 1}});
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
  addStep,
  end
}
