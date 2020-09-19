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
          if (! result) {
            res.render("signin", {message: "User Doesn't Exist In Out Database"});
            return;
          }
          else {
            res.render("home");
          }
        });
    }
    else {
      res.render("signin", {message: "Please Sign In"}); 
    }
  });

  app.get("/sign_up", function(req, res) {
    res.render("registration"); 
  });
  
  app.get("/sign_in", function(req, res) {
    res.render( 'signin' ); 
  });
};
