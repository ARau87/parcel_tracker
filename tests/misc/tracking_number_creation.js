const chai = require('chai');
const expect = chai.expect;
const database = require('../../server/services/database');
const trackingNrCreator = require('../../server/services/misc/tracking_number_creator');

describe('TRACKING-NUMBER CREATION', () => {

  describe('create()', () => {

    before(async () => {
      database.setup('test');
      await database.trackingnr.clear();
    });

    it('should create a new unique key', async () => {

      let parcel = {
          fromCity: 'Olching',
          toCity: 'Puchheim',
          fromName: 'Rau',
          toName: 'Oberländer',
          fromFirstName: 'Andreas',
          toFirstName: 'Sebastian',
          fromPostCode: '82140',
          toPostCode: '82178',
          fromAddress: 'Rauschweg 131',
          toAddress: 'Adenauerstr 8b'
        };

      let tracking = await trackingNrCreator.create(parcel);

      expect(tracking).not.to.be.null.and.not.to.be.undefined;
      expect(tracking.trackingNr).not.to.be.null.and.not.to.be.undefined;
      expect(tracking.randomKey).not.to.be.null.and.not.to.be.undefined;

    });

    it('should at least need an object with fromCity, toCity, fromFirstName and fromName properties', async () => {

      let parcel1 = {
            fromCity: 'Olching',
            toCity: 'Puchheim',
            fromFirstName: 'Andreas',
            fromName: 'Rau'
      };

      let parcel2 = {
            toCity: 'Puchheim'
      };

      let parcel3 = {
            fromCity: 'Olching'
      };

      let parcel4 = {
            toCity: 'Puchheim',
            fromFirstName: 'Andreas',
            fromName: 'Rau'
      };

      let parcel5 = {
            fromCity: 'Olching',
            toCity: 'Puchheim',
            fromFirstName: 'Andreas',
      };

      let tracking1 = await trackingNrCreator.create(parcel1);
      let tracking2 = await trackingNrCreator.create(parcel2);
      let tracking3 = await trackingNrCreator.create(parcel3);
      let tracking4 = await trackingNrCreator.create(parcel4);
      let tracking5 = await trackingNrCreator.create(parcel5);

      expect(tracking1).not.to.be.null.and.not.to.be.undefined;
      expect(tracking1.trackingNr).not.to.be.null.and.not.to.be.undefined;
      expect(tracking1.randomKey).not.to.be.null.and.not.to.be.undefined;

      expect(tracking2).to.be.null;
      expect(tracking3).to.be.null;
      expect(tracking4).to.be.null;
      expect(tracking5).to.be.null;

    });

    it('should create different numbers for two parcels with the exact same properties', async () => {

      let parcel = {
          fromCity: 'Olching',
          toCity: 'Puchheim',
          fromName: 'Rau',
          toName: 'Oberländer',
          fromFirstName: 'Andreas',
          toFirstName: 'Sebastian',
          fromPostCode: '82140',
          toPostCode: '82178',
          fromAddress: 'Rauschweg 131',
          toAddress: 'Adenauerstr 8b'
        };

      for(let i = 0; i < 20; i++){
        let tracking1 = await trackingNrCreator.create(parcel);
        let tracking2 = await trackingNrCreator.create(parcel);

        expect(tracking1.trackingNr).not.to.equal(tracking2.trackingNr);
      }

    });

    it('should create a number that is not more than ' + trackingNrCreator.MAX_CHARS +'chars long', async () => {

      let parcel = {
          fromCity: 'Olching',
          toCity: 'Puchheim',
          fromName: 'Rau',
          toName: 'Oberländer',
          fromFirstName: 'Andreas',
          toFirstName: 'Sebastian',
          fromPostCode: '82140',
          toPostCode: '82178',
          fromAddress: 'Rauschweg 131',
          toAddress: 'Adenauerstr 8b'
        };

        let tracking = await trackingNrCreator.create(parcel);

        expect(tracking.trackingNr.length).to.equal(trackingNrCreator.MAX_CHARS);

    });

    it('should have a cipher property containing the whole ciphertext', async () => {

      let parcel = {
          fromCity: 'Olching',
          toCity: 'Puchheim',
          fromName: 'Rau',
          toName: 'Oberländer',
          fromFirstName: 'Andreas',
          toFirstName: 'Sebastian',
          fromPostCode: '82140',
          toPostCode: '82178',
          fromAddress: 'Rauschweg 131',
          toAddress: 'Adenauerstr 8b'
        };

        let tracking = await trackingNrCreator.create(parcel);

        expect(tracking.trackingNr.length).to.equal(trackingNrCreator.MAX_CHARS);

    });

    after(async () => {
      await database.disconnect();
    });

  })

  describe('decrypt()', () => {

    before(async () => {
      database.setup('test');
      await database.trackingnr.clear();
    });

    it('should return the parcel\'s information from the ciphertext', async () => {

      let parcel = {
          fromCity: 'Olching',
          toCity: 'Puchheim',
          fromName: 'Rau',
          toName: 'Oberländer',
          fromFirstName: 'Andreas',
          toFirstName: 'Sebastian',
          fromPostCode: '82140',
          toPostCode: '82178',
          fromAddress: 'Rauschweg 131',
          toAddress: 'Adenauerstr 8b'
        };

        let tracking = await trackingNrCreator.create(parcel);

        let decrypted = await trackingNrCreator.decrypt(tracking);

        expect(decrypted.fromCity).to.equal(parcel.fromCity);
        expect(decrypted.toCity).to.equal(parcel.toCity);
        expect(decrypted.fromName).to.equal(parcel.fromName);
        expect(decrypted.fromFirstName).to.equal(parcel.fromFirstName);

    })


    after(async () => {
      await database.disconnect();
    });

  });

});
