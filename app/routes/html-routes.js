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


  app.get("/", function(req, res) {
    if (req.session.user) {
      Users.findOne({
        where: {
          email: req.session.user,
        }      
        }).then(function(result) {
          if (result) {
            var userData = {username: result.email, score:0};
            res.render("home", {user: userData});
          }
        });
    }
    else {
      var messageData = {msg: "Please Sign In"};
      res.render("signin", {message: messageData}); 
    }
  });

  app.get("/sign_up", function(req, res) {
    res.render("registration"); 
  });
  
  app.get("/sign_in", function(req, res) {
    res.render( "signin" ); 
  });
};
