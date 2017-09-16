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
const express = require('express');
const bodyParser = require('body-parser');
const log4js = require('log4js');

const restResultUtil = require('./server/util/RestResultUtil');
const config = require("./config");


//config log4js
log4js.configure('log4js.json');
const log = log4js.getLogger("server");

//init express app
const app = express();

//app middleware configuration for all before request
app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(log4js.connectLogger(log4js.getLogger('access'), { level: log4js.levels.DEBUG })); //config log4js access log, request's http header info would be logged.

//set jwt secret;
app.set('jwtSecret', config.jwtSecret);


//register all route
require('./server/router')(app)

//app middleware for general error handling
app.use(function (err, req, res, next) {
    log.error(err);
    res.status(500).send(restResultUtil.createErrorResult("server throws exception, please try it again!"))
});

app.listen(3000, function () {
    log.info('Example app listening on port 3000!')
})