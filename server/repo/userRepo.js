/**
 * user table repo providing DAO operation.
 * @author JoeHu
 * @date 2017-Sep-16
 */

var dbPool = require('../util/dbConnection').pool;
const log4js = require('log4js');
const log = log4js.getLogger("userRepo");

/**
 * get user by email
 * @param email
 * @returns Promise[userObject]
 */
exports.findByEmail = function(email){
    log.debug("find user by email:", email);
    return dbPool.query("select * from user").then(function(rows){
        return rows.length>0?rows[0]:null;
    });
}