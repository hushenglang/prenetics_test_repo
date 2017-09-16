/**
 * user-genetic table repo providing DAO operation.
 * @author JoeHu
 * @date 2017-Sep-16
 */

var dbPool = require('../util/dbConnection').pool;
const log4js = require('log4js');
const log = log4js.getLogger("userRepo");

/**
 * get genetic results by user id
 * @param user_id
 * @returns Promise[userGeneticResults]
 */
exports.findAllByUserId = function(user_id){
    log.debug("find genetic result by user id:", user_id);
    return dbPool.query("SELECT genetic_result, create_date FROM user_genetic WHERE user_id=?", [user_id]);
}
