// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var path = require("path");
var cookieParser = require('cookie-parser');
var Users = require("../models/users.js");

// Routes
// =============================================================
module.exports = function(app) {
  
  app.use(cookieParser());


  app.get("/home", function(req, res) {
    console.log(req.session.user);
    if (req.session.user) {
      Users.findOne({
        where: {
          email: req.session.user,
        }      
        }).then(function(result) {
          if (! result) {
            res.redirect("/sign_in");
            return;
          }
          else {
            res.redirect("/home");
          }
        });
    }
    else {
      res.sendFile(path.join(__dirname, "../public/signin.html"));
    }
  });

  app.get("/sign_up", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/registration.html"));
  });
  
  app.get("/sign_in", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/signin.html"));
  });



};
