// Connections


// *********************************************************************************
// CONNECTION.JS - THIS FILE INITIATES THE CONNECTION TO MYSQL
// *********************************************************************************

// Dependencies
var Sequelize = require("sequelize");

// Creates mySQL connection using Sequelize, the empty string in the third argument spot is our password.
var sequelize = new Sequelize(process.env.DBNAME || "hounted_house_db", process.env.DBUNAME || "root", process.env.DBPWD || "Welcome20!", {
  host: process.env.DBHOST || "localhost",
  port: process.env.DBPORT || 3306,
  dialect: process.env.DIALECT || "mysql",
  pool: {
    max: 5,
    min: 1,
    idle: 120000
  },
  retry: {
    match: [
        /ETIMEDOUT/,
        /EHOSTUNREACH/,
        /ECONNRESET/,
        /ECONNREFUSED/,
        /ETIMEDOUT/,
        /ESOCKETTIMEDOUT/,
        /EHOSTUNREACH/,
        /EPIPE/,
        /EAI_AGAIN/,
        /SequelizeConnectionError/,
        /SequelizeConnectionRefusedError/,
        /SequelizeHostNotFoundError/,
        /SequelizeHostNotReachableError/,
        /SequelizeInvalidConnectionError/,
        /SequelizeConnectionTimedOutError/
    ],
    max: 5
}
});

// Exports the connection for other files to use
module.exports = sequelize;
