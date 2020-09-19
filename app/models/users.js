// sequelize

var Sequelize = require("sequelize");
// sequelize (lowercase) references our connection to the DB.
var sequelize = require("../config/connection.js");
const bcrypt = require("bcryptjs");

// Creates a "hounted_users" model that matches up with DB
var Users = sequelize.define("users", {
  first_name: Sequelize.STRING,
  last_name: Sequelize.STRING,
  email: Sequelize.STRING,
  password: Sequelize.STRING,
  isAuthenticated: Sequelize.BOOLEAN,
});

// Syncs with DB
Users.sync();

// Makes the hounted_users Model available for other files (will also create a table)




module.exports = Users;


