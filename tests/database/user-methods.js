const chai = require('chai');
const expect = chai.expect;
var database = require('../../server/services/database');

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

      let user = await database.user.get({email: 'andirau@gmx.de', password: 'ichbin18'});

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
