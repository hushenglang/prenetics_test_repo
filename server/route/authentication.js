/**
 * authentication controller providing login / logout api
 * @author JoeHu
 * @date 2017-Sep-16
 */

'use strict';

const express = require('express');
const router = express.Router();
const jwt    = require('jsonwebtoken');
const passwordHash = require('password-hash');

const userRepo = require('../repo/userRepo');
const CONST = require('../util/const');
const restResultUtil = require('../util/restResultUtil');

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
    //1. validate is email & password is not null;
    if(!email || !password){
        log.warn("email & password is not provided!");
        res.json(restResultUtil.createFailResult("account validation fail!"));
    }

    //2. get user object by email
    userRepo.findByEmail(email)
        .then(function(user){

            //3. hash password with salt and then compare with password in db.
            var isSuccess = false;
            if(user){
                var hashedPassword = user.password;
                isSuccess = passwordHash.verify(password+user.salt, hashedPassword);
            }

            //4. response the validation result;
            if (isSuccess){
                log.debug("account validation success!");
                var token = jwt.sign({'email':email, "id":user.id}, CONST.JWT_SECRAT, {expiresIn: CONST.JWT_EXPIRE_TIME});
                res.json(restResultUtil.createSuccessResult(token));
            }else{
                log.debug("account validation fail!");
                res.json(restResultUtil.createFailResult("account validation fail!"));
            }
        })
        .catch(next)
});

module.exports = router;