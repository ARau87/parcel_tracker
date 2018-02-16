const mocha = require('mocha');
const chai = require('chai');
const { should, expect } = chai;
const server = require('../../server');
const database = require('../../server/services/database');
const request = require('supertest');

describe('GET /v1/parcel/:trackingNr', () => {

  before( async () => {
    database.setup('test');

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

    await database.user.create(
      {
        email: 'matze@gmx.de',
        firstname: 'Matthias',
        lastname: 'Rems',
        password: 'ichbin18',
        city: 'Puchheim',
        postcode: '82178',
        address: 'Kein plan'
      }
    );

    await database.user.create(
      {
        email: 'bobi@gmx.de',
        firstname: 'Sebastian',
        lastname: 'Oberländer',
        password: 'ichbin18',
        city: 'Puchheim',
        postcode: '82178',
        address: 'Adenauerstr 8b'
      }
    );

    await database.parcel.create(
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

  });

  it('should return an error if the user is not logged in', async () => {

    let res = await request(server)
                    .get('/v1/parcels/A8238978-BDWHDU7126');

    expect(res.status).to.equal(401);


  });

  it('should return information about the parcel with the specified tracking number', async () => {

    let login = await request(server)
                    .post('/login')
                    .set('Accept', 'application/json')
                    .send({
                      email: 'andirau@gmx.de',
                      password: 'ichbin18'
                    });


    let res = await request(server)
                    .get('/v1/parcels/A8238978-BDWHDU7126')
                    .set('cookie', login.headers['set-cookie']);

    expect(res.status).to.equal(200);


  });


  it('should return information about the parcel with the specified tracking number if the receiver is requesting it', async () => {

    let login = await request(server)
                    .post('/login')
                    .set('Accept', 'application/json')
                    .send({
                      email: 'bobi@gmx.de',
                      password: 'ichbin18'
                    });


    let res = await request(server)
                    .get('/v1/parcels/A8238978-BDWHDU7126')
                    .set('cookie', login.headers['set-cookie']);

    expect(res.status).to.equal(200);


  });

  it('should return an error if someoneelse tries to get the parcel\'s details', async () => {

    let login = await request(server)
                    .post('/login')
                    .set('Accept', 'application/json')
                    .send({
                      email: 'matze@gmx.de',
                      password: 'ichbin18'
                    });


    let res = await request(server)
                    .get('/v1/parcels/A8238978-BDWHDU7126')
                    .set('cookie', login.headers['set-cookie']);

    expect(res.status).to.equal(401);


  });


  after(async function() {
    await database.user.clear();
    await database.parcel.clear();
    database.disconnect();
  });

});


describe('POST /v1/parcels/new', () => {

  before( async () => {
    database.setup('test');
    await database.user.clear();
    await database.parcel.clear();

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

  });

  it('should create a new parcel with fresh tracking number and save everything into database', async () => {

    let login = await request(server)
                    .post('/login')
                    .set('Accept', 'application/json')
                    .send({
                      email: 'andirau@gmx.de',
                      password: 'ichbin18'
                    });


    let res = await request(server)
                    .post('/v1/parcels/new')
                    .set('Cookie', login.headers['set-cookie'])
                    .send(
                      {
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
                    )
                    
    expect(res.status).to.equal(200);


  });


  after(async () => {
    database.disconnect();
  });

});
