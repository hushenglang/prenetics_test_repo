/**
 * account controller providing account related api.
 * @author JoeHu
 * @date 2017-Sep-16
 */

'use strict';

const express = require('express');
const userRepo = require('../repo/userRepo');
const restResultUtil = require('../util/RestResultUtil');
const router = express.Router();
const log4js = require('log4js');
const log = log4js.getLogger("account");

/**
 * get user profile
 */
router.get('/profile', function(req, res, next){
    log.info("get profile by email:", req.body.email);
    userRepo.findByEmail(req.body.email)
        .then(function(user){
            res.json(restResultUtil.createSuccessResult(user));
        })
        .catch(next);

});


module.exports = router;