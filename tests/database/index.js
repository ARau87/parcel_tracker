const chai = require('chai');
const expect = chai.expect;
var database = require('../../server/services/database');


describe('DATABASE', () => {

    require('./user-methods');
    require('./parcel-methods');
    require('./tracking-number-methods');

});
