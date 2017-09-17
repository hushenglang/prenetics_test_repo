/**
 * the main function
 * @author JoeHu
 * @date 2017-Sep-16
 */

'use strict';

/**
 * Module dependencies.
 */
const path = require('path');
const https = require('https');
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const log4js = require('log4js');

const restResultUtil = require('./server/util/restResultUtil');
const config = require("./config");


//config log4js
log4js.configure('log4js.json');
const log = log4js.getLogger("server");

//init express app
const app = express();

//app middleware configuration
app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(log4js.connectLogger(log4js.getLogger('access'), { level: log4js.levels.DEBUG })); //config log4js access log, request's http header info would be logged.

//register all route
require('./server/router')(app)

//app middleware for general error handling
app.use(function (err, req, res, next) {
    log.error(err);
    res.status(500).send(restResultUtil.createErrorResult("server throws exception, please try it again!"))
});


//start http server, port config in config.json file
app.listen(config.port.http, function () {
    log.info('http server listening on port ', config.port.http);
})

//start https server, port config in config.json file
const options = {
    key: fs.readFileSync('./ssl/server.key'),
    cert: fs.readFileSync('.//ssl/server.crt'),
    requestCert: false,
    rejectUnauthorized: false
};
var server = https.createServer(options, app).listen(config.port.https, function(){
    console.log("https server listening on port ", config.port.https);
});