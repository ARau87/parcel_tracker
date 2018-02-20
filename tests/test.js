const mocha = require('mocha');
const database = require('../server/services/database');

describe('PARCEL TRACKER TESTS', () => {

  before( async () => {
    database.setup('test');
    await database.user.clear();
    await database.parcel.clear();
    await database.trackingnr.clear();
  });

  require('./database');
  require('./auth');
  require('./rest');
  require('./misc');


  after( async () => {
    await database.user.clear();
    await database.parcel.clear();
    await database.trackingnr.clear();
    database.disconnect();
  });

});
