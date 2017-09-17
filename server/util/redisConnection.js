/**
 * redis connection util, provide promise way to get/set key-value;
 * @author JoeHu
 * @date 2017-Sep-17
 */

'use strict';

const redis = require('redis');
const bluebird = require("bluebird");
const config = require("../../config");
const log4js = require('log4js');
const log = log4js.getLogger("redisConnection");

log.info("Start connecting Redis...");

bluebird.promisifyAll(redis.RedisClient.prototype);

var redisClient = redis.createClient({host : config.redis.url, port : config.redis.port, expire: 1});
redisClient.on('ready',function() {
    log.info("Redis is ready...");
});
redisClient.on('error',function() {
    log.error("Error in Redis...");
});


module.exports = {
        getKeyValue: function(key){
            return redisClient.getAsync(key)
                .then((res, err) => err ? Promise.reject("getKeyValue : "+err) : Promise.resolve(JSON.parse(res)));
        },

        setKeyValue: function(key, value){
            return redisClient.setAsync(key, JSON.stringify(value))
                .then((res, err) => err ? Promise.reject("setkeyvalue : "+ err) : Promise.resolve(res));
        },

        doesKeyExist: function(key){
            return redisClient.existsAsync(key)
                .then((res, err) => !res || err ? Promise.resolve(false) : Promise.resolve(res));
        },

        deleteKey: function(key){
            return redisClient.delAsync(key)
                .then((res, err) => res ? Promise.resolve(res) : Promise.reject("deleteKey :"+err));
        }
};
