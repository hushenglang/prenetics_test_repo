/**
 * constant
 * @author JoeHu
 * @date 2017-Sep-16
 */

'use strict';

const config = require("../../config");

module.exports = {
    JWT_SECRAT: config.jwtSecret,
    JWT_EXPIRE_TIME: '2h'
}