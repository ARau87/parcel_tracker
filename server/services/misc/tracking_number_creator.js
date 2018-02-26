'use strict';

const database = require('../database');
const cryptoJS = require('crypto-js');
const randomstring = require('randomstring');
const MAX_CHARS = 12;
const VALID_CHARS = 'abcdefghijkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ123456789123456789123456789---';

// Helper function that creates random Integer values
function _getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

// Choose random characters of a string and return a new string
function _createRandomString(integer, string){
  var randomString = '';
  while(integer !== 0){
    randomString += string[_getRandomInt(string.length)];
    integer--;
  }

  return randomString;
}

// Create a new trackingNr randomKey pair that can be saved in database
const create = (parcel) => {

  if(parcel && parcel.fromCity && parcel.toCity && parcel.fromName && parcel.fromFirstName){
    const key = randomstring.generate(MAX_CHARS);
    const stringToEncrypt = JSON.stringify({fromCity: parcel.fromCity, toCity: parcel.toCity, fromFirstName: parcel.fromFirstName, fromName: parcel.fromName});
    const encryption = cryptoJS.AES.encrypt(stringToEncrypt, key);
    let ciphertext = encryption.toString();

    var trackingNr = _createRandomString(MAX_CHARS, VALID_CHARS);
    //TODO: Put Logic here that tracking number reflects somehow the direction of the parcel

    // Check if the tracking number is existing in database
    return database.trackingnr.get({trackingNr: trackingNr})
                       .then((tracking) => {
                         if(tracking === null){
                           // The trackingNr are MAX_CHARS random characters of the ciphertext (to reduce collision)
                           // The whole ciphertext is saved in the cipher field
                           return {trackingNr: trackingNr , cipher: ciphertext , randomKey: key};
                         }
                         else return create(parcel);
                       })
                       .catch((err) => console.error(err));

  }
  else {
    return null;
  }

}

// Decrypt the ciphertext of the tracking and return the encrypted information
const decrypt = (tracking) => {
  // The tracking object must include a ciphertext key pair
  if(tracking && tracking.cipher && tracking.randomKey){
    let bytes = cryptoJS.AES.decrypt(tracking.cipher, tracking.randomKey);
    return JSON.parse(bytes.toString(cryptoJS.enc.Utf8));
  }
  else {
    return null;
  }
}

module.exports = {
  MAX_CHARS,
  create,
  decrypt
}
