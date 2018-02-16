'use strict';

process.env.NODE_ENV = 'test';

const mocha = require('mocha');
const chai = require('chai');
const { should, expect } = chai;
const server = require('../../server');
const database = require('../../server/services/database');
const request = require('supertest');


describe('REST', () => {

  require('./parcel-routes.js');


});
