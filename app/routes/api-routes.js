// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var path = require("path");
var Users = require("../models/users.js");


// Routes
// =============================================================
module.exports = function(app) {

  // Each of the below routes just handles the HTML page that the user gets sent to.

  // index route loads view.html
  app.post("/api/new_user", function(req, res) {
      console.log("User Data:");
      console.log(req.body);
      Users.create({
        first_name: req.body.firstName,
        last_name: req.body.lastName,
        username: req.body.username,
        password: req.body.password,
        created_at: req.body.created_at
      }).then(function(results) {
        res.end();
      });
  
    });
    

  app.get("/api/users", function(req, res) {

    Users.findAll({}).then(function(results) {
      // results are available to us inside the .then
      console.log(req);
      res.json(results);
    });

  });
};
