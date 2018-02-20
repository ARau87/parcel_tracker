'use strict';

process.env.NODE_ENV = 'test';

const mocha = require('mocha');
const chai = require('chai');
const { should, expect } = chai;
const server = require('../../server');
const database = require('../../server/services/database');
const request = require('supertest');


describe('AUTHENTIFICATION', () => {

    describe('GET /logout', () => {

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

      it('should destroy the current session', async () => {

        let agent = request.agent(server);

        let login = await agent
                        .post('/login')
                        .set('Accept', 'application/json')
                        .send({
                          email: 'andirau@gmx.de',
                          password: 'ichbin18'
                        });

        let logout = await agent
                        .set('cookie', login.headers['set-cookie'])
                        .get('/logout');

        expect(logout.headers['cookie']).to.be.undefined;

      })


      after(async function() {
        await database.user.clear();
        database.disconnect();
      });

    });

    describe('POST /login', () => {

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

            let res = await request.agent(server)
                            .post('/login')
                            .set('Accept', 'application/json')
                            .send({
                              email: 'andirau@gmx.de',
                              password: 'ichbin18'
                            })
                            .expect(200);

      });

      it('should create a new session and send the session cookie with "set-cookie"', async () => {

            let res = await request.agent(server)
                            .post('/login')
                            .set('Accept', 'application/json')
                            .send({
                              email: 'andirau@gmx.de',
                              password: 'ichbin18'
                            })
                            .expect(200);

            expect(res.headers['set-cookie']).not.to.be.undefined;

      });

      it('should return a response with status 404 if a false password or username is provided', async () => {

            let res1 = await request.agent(server)
                             .post('/login')
                             .set('Accept', 'application/json')
                             .send({
                                email: 'andirau@gmx.de',
                                password: 'ichbin17'
                             });
            let res2 = await request.agent(server)
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

            let res1 = await request.agent(server)
                             .post('/login')
                             .set('Accept', 'application/json')
                             .send({
                                password: 'ichbin18'
                             });
            let res2 = await request.agent(server)
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

    describe('POST /register', () => {

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

      });

      it('should create a new user if all required parameters exist', async () => {

        let user = {
                    email: 'bobi@gmx.de',
                    firstname: 'Bobi',
                    lastname: 'Oberländer',
                    password: 'ichbin17',
                    city: 'Puchheim',
                    postcode: '82178',
                    address: 'Adenauerstr 8b'
                  }
        await request.agent(server)
                     .post('/register')
                     .send(user)
                     .expect(200);

        await request.agent(server)
                     .post('/login')
                     .set('Accept', 'application/json')
                     .send({
                          email: user.email,
                          password: user.password
                     })
                     .expect(200);
      });

      it('should not create a new user if the user already exists in the database', async () => {

        let user ={
                    email: 'andirau@gmx.de',
                    firstname: 'Andreas',
                    lastname: 'Rau',
                    password: 'ichbin18',
                    city: 'Olching',
                    postcode: '82140',
                    address: 'Rauschweg 131'
                  }

        await request.agent(server)
                     .post('/register')
                     .send(user)
                     .expect(401);

      });

    });

    describe('GET /login', () => {

        before( async () => {
            database.setup('test');

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

        });

        it('should return the username of currently logged in user', async () => {

            let agent = request.agent(server);

            let login = await agent.post('/login')
                                   .send({
                                       email: 'andirau@gmx.de',
                                       password: 'ichbin18',
                                   })
                                   .expect(200);

            let res = await agent.set('cookie', login.headers['set-cookie'])
                                 .get('/login')
                                 .expect(200);

            expect(res.body.email).to.equal('andirau@gmx.de');

        });

        it('should return a response with status 401 if user is not logged in', async () => {

            let agent = request.agent(server);

            let res = await agent.get('/login')
                                 .expect(401);

        });

        after(async function() {
            await database.user.clear();
            await database.disconnect();
        });

    });

});
