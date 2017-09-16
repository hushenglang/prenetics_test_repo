/**
 * provide all router registration & token verification handler
 * @author JoeHu
 * @date 2017-Sep-16
 */

'use strict';

// const CONST = require('./util/const');
const tokenVerificationFilter = require('./filter/tokenVerificationFilter');
const log4js = require('log4js');
const log = log4js.getLogger("router");

//register route
module.exports = function(app){
    //register token verification filter, intercept "/api".
    app.use('/api', tokenVerificationFilter);

    //register route
    app.use('/api/account',require('./route/account'));
    app.use('/auth',require('./route/authentication'));
    log.debug("register route success!");
};

