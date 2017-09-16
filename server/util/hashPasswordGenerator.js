/**
 * tools to help generate hashed password
 * @author JoeHu
 * @date 2017-Sep-17
 */

const crypto = require("crypto");
const passwordHash = require('password-hash');
const log4js = require('log4js');
const log = log4js.getLogger("authentication");


function generateSaltHashedPwd(pwd) {
    var salt = crypto.randomBytes(128).toString('base64');
    var hashedPwd = passwordHash.generate(pwd + salt);
    return {
        salt:salt,
        hashedPassword: hashedPwd
    }
}

res = generateSaltHashedPwd("123456");
log.info("salt: ",res.salt);
log.info("hashedPassword: ",res.hashedPassword);
