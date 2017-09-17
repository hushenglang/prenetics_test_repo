/**
 * testing base which wrapper server.js.
 * @author JoeHu
 * @date 2017-Sep-16
 */

'use strict';

var supertest = require('supertest');
var app = require('../server.js');
var request=supertest(app);

module.exports = {
    requestHelp: request,
    authToken: null
};