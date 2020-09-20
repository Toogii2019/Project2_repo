var Sequelize = require("sequelize");
// sequelize (lowercase) references our connection to the DB.
var sequelize = require("../config/connection.js");

// Creates a "hounted_users" model that matches up with DB
var Game = sequelize.define("game", {
  email: Sequelize.STRING,
  score: Sequelize.INTEGER,
});

// Syncs with DB
Game.sync();

// Makes the hounted_users Model available for other files (will also create a table)




module.exports = Game;
