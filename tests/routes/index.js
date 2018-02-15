'use strict';

process.env.NODE_ENV = 'test';

const mocha = require('mocha');
const chai = require('chai');
const { should, expect } = chai;
const server = require('../../server');
const database = require('../../server/services/database');
const request = require('supertest');


describe('REST API', () => {

  describe('Authentication', () => {

    describe('Register', () => {

    });

    describe('/login', () => {

      before( async () => {
        database.setup('test');

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

            let res = await request(server)
                            .post('/login')
                            .set('Accept', 'application/json')
                            .send({
                              email: 'andirau@gmx.de',
                              password: 'ichbin18'
                            });
            expect(res.status).to.equal(200);

      });

      it('should return a response with status 404 if a false password or username is provided', async () => {

            let res1 = await request(server)
                             .post('/login')
                             .set('Accept', 'application/json')
                             .send({
                                email: 'andirau@gmx.de',
                                password: 'ichbin17'
                             });
            let res2 = await request(server)
                             .post('/login')
                             .set('Accept', 'application/json')
                             .send({
                                email: 'andirau1@gmx.de',
                                password: 'ichbin18'
                             });

            expect(res1.status).to.equal(404);
            expect(res2.status).to.equal(404);

      });

      it('should return a response with status 404 if password or username are missing', async () => {

            let res1 = await request(server)
                             .post('/login')
                             .set('Accept', 'application/json')
                             .send({
                                password: 'ichbin18'
                             });
            let res2 = await request(server)
                             .post('/login')
                             .set('Accept', 'application/json')
                             .send({
                                email: 'andirau1@gmx.de',
                             });

            expect(res1.status).to.equal(404);
            expect(res2.status).to.equal(404);

      });


      after(async function() {
        await database.user.clear();
        database.disconnect();
      });

    });

  });

});
