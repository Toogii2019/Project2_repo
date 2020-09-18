// sequelize

var Sequelize = require("sequelize");
// sequelize (lowercase) references our connection to the DB.
var sequelize = require("../config/connection.js");

// Creates a "Chirp" model that matches up with DB
var Users = sequelize.define("hounted_users", {
  first_name: Sequelize.STRING,
  last_name: Sequelize.STRING,
  username: Sequelize.STRING,
  password: Sequelize.STRING,
});

// Syncs with DB
Users.sync();

// Makes the Chirp Model available for other files (will also create a table)
module.exports = Users;


