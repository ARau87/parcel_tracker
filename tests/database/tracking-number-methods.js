const chai = require('chai');
const expect = chai.expect;
var database = require('../../server/services/database');

describe('trackingnr.', () => {

  describe('create()', () => {

    before(async () => {
      database.setup('test');
      await database.trackingnr.clear();

    });

    it('should a new tracking number instance to the database', async () => {

      let trackingNr = await database.trackingnr.create({trackingNr: 'AUIH7656DG-HYERSHMJ7656', randomKey: 'qhfiuqhduhud78gd27g8dg192'});

      expect(trackingNr.trackingNr).to.equal('AUIH7656DG-HYERSHMJ7656');
      expect(trackingNr.randomKey).to.equal('qhfiuqhduhud78gd27g8dg192');

    });

    it('should return null if either trackingNr or randomKey are missing', async () => {
      let trackingNr1 = await database.trackingnr.create({trackingNr: 'AUIH7656DG-HYERSHMJ7657'});
      let trackingNr2 = await database.trackingnr.create({randomKey: 'qhfiuqhduhud78gd27g8dg193'});

      expect(trackingNr1).to.be.null;
      expect(trackingNr2).to.be.null;
    })

    after(() => {
      database.disconnect();
    });
  });

    describe('get()', () => {

      before(async () => {
        database.setup('test');
        await database.trackingnr.clear();

      });

      it('should return the trackingNr with randomKey from database if a valid trackingNr is provided', async () => {
        await database.trackingnr.create({trackingNr: 'AUIH7656DG-HYERSHMJ7656', randomKey: 'qhfiuqhduhud78gd27g8dg192'});

        let trackingNr = await database.trackingnr.get({trackingNr: 'AUIH7656DG-HYERSHMJ7656'});

        expect(trackingNr.trackingNr).to.equal('AUIH7656DG-HYERSHMJ7656');
        expect(trackingNr.randomKey).to.equal('qhfiuqhduhud78gd27g8dg192');

      });

      after(() => {
        database.disconnect();
      });


  });

});
