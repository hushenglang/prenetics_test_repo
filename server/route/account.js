/**
 * account controller providing account related api.
 * @author JoeHu
 * @date 2017-Sep-16
 */

'use strict';

const express = require('express');
var redisClient = require('../util/redisConnection');
const userRepo = require('../repo/userRepo');
const userGeneticRepo = require('../repo/userGeneticRepo');
const restResultUtil = require('../util/restResultUtil');
const router = express.Router();
const log4js = require('log4js');
const log = log4js.getLogger("account");

/**
 * get user profile with redis cache.
 */
router.get('/profile', function(req, res, next){
    log.info("get user profile by email:", req._user.email);
    const redisKey = "/profile/"+req._user.email;
    var isHit = false;

    redisClient.getKeyValue(redisKey)
        .then(function(user){
            if(user ==null){
                log.info("query from db...");
                return userRepo.findByEmail(req._user.email)
            }else {
                log.info("hit redis key: ", redisKey);
                isHit = true;
                return user;
            }
        })
        .then(function(user){
            if(!isHit) { // if redis key not exist, cache result.
                redisClient.setKeyValue(redisKey, user);
            }
            return user;
        })
        .then(function(user){
            res.json(restResultUtil.createSuccessResult(user));
        })
        .catch(next);
});

/**
 * get user genetic results without redis cache
 */
router.get('/genetic_results', function(req, res, next){
    log.info("get user genetic result by user_id:", req._user.id);
    userGeneticRepo.findAllByUserId(req._user.id)
        .then(function(genetic_results){
            res.json(restResultUtil.createSuccessResult(genetic_results));
        })
        .catch(next);
});

module.exports = router;