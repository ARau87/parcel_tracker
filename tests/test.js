const mocha = require('mocha');

describe('PARCEL TRACKER TESTS', () => {

  require('./database');
  require('./auth');
  require('./rest');
  require('./misc');

});
