const chai = require('chai');
const expect = chai.expect;
var database = require('../../server/services/database');


describe('DATABASE', () => {

  describe('user.', () => {

    describe('create()', () => {

      before((done) => {
        database.setup('test');
        done();
      });


      it('should create a user in the database if all parameters are provided', async () => {
        await database.user.clear();
        // All required params
        let user = await database.user.create(
          {
            email: 'andirau@gmx.de',
            firstname: 'Andreas',
            lastname: 'Rau',
            password: 'ichbin18',
            city: 'Olching',
            postcode: '82140',
            address: 'Rauschweg 131'
          }
        );

        expect(user.email).to.equal('andirau@gmx.de');
        expect(user.firstname).to.equal('Andreas');
        expect(user.lastname).to.equal('Rau');
        expect(user.password).to.equal('ichbin18');
        expect(user.city).to.equal('Olching');
        expect(user.postcode).to.equal('82140');
        expect(user.address).to.equal('Rauschweg 131');


      });

      it('should fail if some required parameters are not provided', async () => {

        await database.user.clear();

        let user = await database.user.create(
          {
            email: 'andirau@gmx.de',
            firstname: 'Andreas',
            password: 'ichbin18',
            city: 'Olching',
            postcode: '82140',
            address: 'Rauschweg 131'
          }
        );

        expect(user).to.be.undefined;
      });

      after(async () => {
        await database.user.clear();
        database.disconnect();
      });
    });

    describe('set()', () => {

      before((done) => {
        database.setup('test');
        done();
      });

      it('should change the user and set the specified parameters to the values provided', async () => {
        await database.user.clear();

        let success = await database.user.create(
          {
            email: 'andirau@gmx.de',
            firstname: 'Andreas',
            lastname: 'Rau',
            password: 'ichbin18',
            city: 'Olching',
            postcode: '82140',
            address: 'Rauschweg 131'
          }
        );


        await database.user.set({email: 'andirau@gmx.de'}, {firstname: 'AndreasT', lastname: 'RauT'});
        let user = await database.user.get({email: 'andirau@gmx.de'});

        expect(user.firstname).to.equal('AndreasT');
        expect(user.lastname).to.equal('RauT');

      });

      it('should not work if something else but the email is provided', async () => {
        await database.user.clear();

        await database.user.create(
          {
            email: 'andirau@gmx.de',
            firstname: 'Andreas',
            lastname: 'Rau',
            password: 'ichbin18',
            city: 'Olching',
            postcode: '82140',
            address: 'Rauschweg 131'
          }
        );


        await database.user.set({firstname: 'Andreas'}, {email: 'raudi8788@gmail.com', lastname: 'RauT'});
        let user = await database.user.get({email: 'raudi8788@gmail.com'});

        expect(user).to.be.null;

      });

      after(async () => {
        await database.user.clear();
        database.disconnect();
      });
    });

    describe('get()', () => {
      before(async () => {
        database.setup('test');
        await database.user.clear();
      });

      it('should return the user specified by the provided parameters', async () => {

        await database.user.create(
          {
            email: 'andirau@gmx.de',
            firstname: 'Andreas',
            lastname: 'Rau',
            password: 'ichbin18',
            city: 'Olching',
            postcode: '82140',
            address: 'Rausprocess after testchweg 131'
          }
        );

        let user = await database.user.get({email: 'andirau@gmx.de'});

        expect(user.firstname).to.equal('Andreas');
        expect(user.lastname).to.equal('Rau');
      });

      it('should return null if no email address is specified in the identifier', async () => {

        await database.user.create(
          {
            email: 'andirau1@gmx.de',
            firstname: 'Andreas',
            lastname: 'Rau',
            password: 'ichbin18',
            city: 'Olching',
            postcode: '82140',
            address: 'Rauschweg 131'
          }
        );

        let user = await database.user.get({firstname: 'Andreas'});

        expect(user).to.be.null;
      });

      after(async () => {
        await database.user.clear();
        database.disconnect();
      });
    });

  });

  describe('parcel.', () => {

    before(async () => {
      database.setup('test');
      await database.parcel.clear();
    });

    describe('create()', () => {

      it('should create a new parcel instance in the database if all required parameters are provided', async () => {

        let parcel = await database.parcel.create(
          {
            trackingNr: 'A8238978-BDWHDU7126',
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
          }
        );

        expect(parcel.trackingNr).to.equal('A8238978-BDWHDU7126');

      });

      it('should not create new instances if required parameters are missing', async () => {

        let parcel = await database.parcel.create(
          {
            trackingNr: 'A8238978-BDWHDU7127',
            toCity: 'Puchheim',
            fromName: 'Rau',
            toName: 'Oberländer',
            fromFirstName: 'Andreas',
            toFirstName: 'Sebastian',
            fromCityCode: '82140',
            toCityCode: '82178',
            fromAddress: 'Rauschweg 131',
            toAddress: 'Adenauerstr 8b'
          }
        );

        expect(parcel).to.be.null;

      });

      after(async () => {
        await database.parcel.clear();
        database.disconnect();
      });
    });

    describe('get()', () => {

      before((done) => {
        database.setup('test');
        done();
      });

      it('should return the parcel identified by the provided identifier object which must contain the tracking number', async () => {

        let p = await database.parcel.create(
          {
            trackingNr: '123',
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
          }
        );

        let parcelFound = await database.parcel.get({trackingNr: '123'});
        expect(parcelFound.fromCity).to.equal('Olching');
      });

      it('should not return a parcel if the tracking number is missing', async () => {

        await database.parcel.create(
          {
            trackingNr: 'A8238978-BDWHDU7128',
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
          }
        );

        let parcel = await database.parcel.get({toCity: 'Puchheim'});
        expect(parcel).to.be.null;
      });

      after(async () => {
        await database.parcel.clear();
        database.disconnect();
      });
    });


    describe('set()', () => {

      before((done) => {
        database.setup('test');
        done();
      });

      it('should update the parcel specified by the identifier containing the tracking number and set the provided parameters', async () => {
        await database.parcel.create(
          {
            trackingNr: 'A8238978-BDWHDU7129',
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
          }
        );

        await database.parcel.set({trackingNr: 'A8238978-BDWHDU7129'}, {fromCity: 'München', fromPostCode: '81541'});

        let parcel = await database.parcel.get({trackingNr: 'A8238978-BDWHDU7129'});

        expect(parcel.fromCity).to.equal('München');
        expect(parcel.fromPostCode).to.equal('81541');
      });

      it('should not update a parcel if the tracking number is not specified', async () => {
        await database.parcel.create(
          {
            trackingNr: 'A8238978-BDWHDU7130',
            fromCity: 'OlchingTTT',
            toCity: 'Puchheim',
            fromName: 'Rau',
            toName: 'Oberländer',
            fromFirstName: 'Andreas',
            toFirstName: 'Sebastian',
            fromPostCode: '82140',
            toPostCode: '82178',
            fromAddress: 'Rauschweg 131',
            toAddress: 'Adenauerstr 8b'
          }
        );

        await database.parcel.set({fromCity: 'OlchingTTT'}, {fromCity: 'München', fromPostCode: '81541'});

        let parcel = await database.parcel.get({trackingNr: 'A8238978-BDWHDU7130'});

        expect(parcel.fromCity).to.equal('OlchingTTT');
        expect(parcel.fromPostCode).to.equal('82140');
      });

      after( async () => {
        await database.parcel.clear();
        database.disconnect();
      });
    });

    describe('addStep()', () => {

      before(async () => {
        database.setup('test');
        database.parcel.clear();
      });

      it('should add a step to the parcel identified by the tracking number and update the nextStep', async () => {
        await database.parcel.create(
          {
            trackingNr: 'A8238978-BDWHDU7131',
            fromCity: 'OlchingTTT',
            toCity: 'Puchheim',
            fromName: 'Rau',
            toName: 'Oberländer',
            fromFirstName: 'Andreas',
            toFirstName: 'Sebastian',
            fromPostCode: '82140',
            toPostCode: '82178',
            fromAddress: 'Rauschweg 131',
            toAddress: 'Adenauerstr 8b'
          }
        );

        let newStep = {
          stepLocation: 'München',
          stepName: 'Logistikzentrum'
        };

        await database.parcel.addStep({trackingNr: 'A8238978-BDWHDU7131'}, newStep);

        let parcel = await database.parcel.get({trackingNr: 'A8238978-BDWHDU7131'});
        let loadedSteps = parcel.previousSteps;

        expect(loadedSteps[0].stepLocation).to.equal(newStep.stepLocation);
        expect(loadedSteps[0].stepName).to.equal(newStep.stepName);
      });

      it('should not return a parcel if the tracking number is missing', async () => {
        await database.parcel.create(
          {
            trackingNr: 'A8238978-BDWHDU7132',
            fromCity: 'OlchingTTTT',
            toCity: 'Puchheim',
            fromName: 'Rau',
            toName: 'Oberländer',
            fromFirstName: 'Andreas',
            toFirstName: 'Sebastian',
            fromPostCode: '82140',
            toPostCode: '82178',
            fromAddress: 'Rauschweg 131',
            toAddress: 'Adenauerstr 8b'
          }
        );

        let newStep = {
          stepLocation: 'München',
          stepName: 'Logistikzentrum'
        };

        await database.parcel.addStep({fromCity: 'OlchingTTTT'}, newStep);

        let parcel = await database.parcel.get({trackingNr: 'A8238978-BDWHDU7132'});
        let loadedSteps = parcel.previousSteps;

        expect(loadedSteps[0]).to.be.undefined;
      });

      after(async () => {
        await database.parcel.clear();
        database.disconnect();
      });
    });

  });
  describe('trackingnr.', () => {
  });

});
