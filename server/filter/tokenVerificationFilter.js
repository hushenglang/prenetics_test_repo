/**
 * token verification filter to intercept all "/api".
 * @author JoeHu
 * @date 2017-Sep-16
 */

'use strict';

const jwt    = require('jsonwebtoken');
const restResultUtil = require('../util/RestResultUtil');
const CONST = require('../util/const');
const log4js = require('log4js');
const log = log4js.getLogger("router");

/**
 * route middleware to verify a token
  */
function tokenVerify(req, res, next) {
    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['x-access-token'] || req.headers['Authorization'] || req.headers['authorization'];
    // decode token
    if (token) {
        // remove bearer string if existed;
        var bearerString = "Bearer ";
        if (token.indexOf(bearerString) != -1) {
            token = token.replace(/Bearer\s+/g, '');
            token = token.replace(/\"/g, '');
        }
        // verifies secret and checks exp
        jwt.verify(token, CONST.JWT_SECRAT, function(err, user) {
            if (err) {
                log.error('Failed to authenticate token.');
                return res.json(restResultUtil.createFailResult('Failed to authenticate token.'));
            } else {
                // if everything is good, save to request for use in other route
                req._user = user;
                next();
            }
        });
    } else {
        // if there is no token
        // return an error
        log.error('No token provided.');
        return res.status(403).send(restResultUtil.createFailResult('Token is not provided!'));
    }
};

module.exports = tokenVerify;