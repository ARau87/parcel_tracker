'use strict';
const mongoose = require('mongoose');

// Clear parcel collection
const clear = async () => {
  const TrackingNr = mongoose.model('tracking_nr');

  return TrackingNr.remove({});
}

// Create a new tracking number instance and save it to the database
const create = async (trackingNumber) => {
  const TrackingNr = mongoose.model('tracking_nr');

  if(trackingNumber.trackingNr && trackingNumber.randomKey){
    let newTrackingNr = new TrackingNr({...trackingNumber});
    return newTrackingNr.save();
  }
  else {
    return null;
  }
}

// Get a trackingNr instance from the database
const get = async (identifier) => {
  const TrackingNr = mongoose.model('tracking_nr');

  if(identifier.trackingNr){
    return TrackingNr.findOne({...identifier});
  }
  else {
    return null;
  }


}

module.exports = {
  clear,
  create,
  get

}
