const config = require("../../config");

module.exports = {
    JWT_SECRAT: config.jwtSecret,
    JWT_EXPIRE_TIME: '2h'
}