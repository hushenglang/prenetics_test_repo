/**
 * authentication controller providing login / logout api
 * @author JoeHu
 * @date 2017-Sep-16
 */

'use strict';


const express = require('express');
const router = express.Router();
const userRepo = require('../repo/userRepo');
const jwt    = require('jsonwebtoken');
const CONST = require('../util/const');
const restResultUtil = require('../util/RestResultUtil');

const log4js = require('log4js');
const log = log4js.getLogger("authentication");

/**
 * user login
 * @param email
 * @param password
 */
router.post('/login', function(req, res, next){
    log.info("user login ...", req.body.email);
    const email = req.body.email;
    const password = req.body.password;
    //get user object by email
    userRepo.findByEmail(email)
        .then(function(user){
            if (email&&password == user.password){
                log.debug("account validation success!");
                var token = jwt.sign({'email':email, "id":user.id}, CONST.JWT_SECRAT, {expiresIn: CONST.JWT_EXPIRE_TIME});
                res.json(restResultUtil.createSuccessResult(token));
            }else{
                log.debug("account validation fail!");
                res.json(restResultUtil.createErrorResult("account validation fail!"));
            }
        })
        .catch(next)
});

module.exports = router;