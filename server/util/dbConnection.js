/**
 * Database connection pool
 * @author JoeHu
 * @date 2017-Sep-16
 */

'use strict';

const mysql = require('promise-mysql');
const config = require("../../config");

const pool = mysql.createPool({
    host: config.mysql.url,
    user: config.mysql.username,
    password: config.mysql.password,
    database: config.mysql.database,
    connectionLimit: config.mysql.maxConnections
});

exports.pool = pool;