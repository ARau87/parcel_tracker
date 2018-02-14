'use strict';

process.env.NODE_ENV = 'test';

const mocha = require('mocha');
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should;
const server = require('../../server');
const database = require('../../server/services/database');

chai.use(chaiHttp);

describe('REST API', () => {

  describe('Authentication', () => {

    describe('Register', () => {

    });

    describe('/login', () => {

      before( async () => {
        await database.setup('test');

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

      });

      it('should return a response with status 200 if the user is existing', async () => {

        await chai.request(server)
            .post('/login')
            .send({
              email: 'andirau@gmx.de',
              password: 'ichbin18'
            })
            .end((err, res) => {
              res.should.have.status(200);
            });

      });

      it('should return a response with status 404 if a false password or username is provided', async () => {

        await chai.request(server)
            .post('/login')
            .send({
              email: 'andirau@gmx.de',
              password: 'ichbin17'
            })
            .end((err, res) => {
              res.should.have.status(404);
            });

        await chai.request(server)
            .post('/login')
            .send({
              email: 'andirau1@gmx.de',
              password: 'ichbin18'
            })
            .end((err, res) => {
              res.should.have.status(404);
            });

      });

      it('should return a response with status 404 if a false password or username is not provided', async () => {

        await chai.request(server)
            .post('/login')
            .send({
              email: 'andirau@gmx.de'
            })
            .end((err, res) => {
              res.should.have.status(404);
            });

        await chai.request(server)
            .post('/login')
            .send({
              password: 'ichbin18'
            })
            .end((err, res) => {
              res.should.have.status(404);
            });

      });


      after(async function() {
        await database.user.clear();
        database.disconnect();
      });

    });

  });

});
