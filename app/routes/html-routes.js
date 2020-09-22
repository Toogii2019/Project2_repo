// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var path = require("path");
var cookieParser = require('cookie-parser');
var Users = require("../models/users.js");
const Game = require("../models/game.js");

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

            Game.findOne({
              where: {
                email: result.email,
              }
            }).then(function(game_result) {
              var userData = {username: game_result.email, score : game_result.score};
              res.render("home", {user: userData});
            })
          }
        });
    }
    else {
      var messageData = {msg: "Please Sign In"};
      res.render("signin", {message: messageData}); 
    }
  });

  app.get("/sign_up", function(req, res) {
    var messageData = {msg: "Please register as a new user"};
    res.render("registration", {message: messageData}); 
  });
  
  app.get("/sign_in", function(req, res) {
    res.render( "signin" ); 
  });

  app.get("/trivia", function(req, res) {
    if (req.session.user) {
      Users.findOne({
        where: {
          email: req.session.user,
        }      
        }).then(function(result) {
          if (result) {
            res.sendFile(path.join(__dirname, '../public/trivia/trivia.html'));
          }
        });
    }
    else {
      res.redirect("/sign_in"); 
    }


    // res.sendFile(path.join(__dirname, '../public/trivia/trivia.html'));
  });

  app.get("/tetris", function(req, res) {

    if (req.session.user) {
      Users.findOne({
        where: {
          email: req.session.user,
        }      
        }).then(function(result) {
          if (result) {
            res.sendFile(path.join(__dirname, '../public/tetris/tetris.html'));
          }
        });
    }
    else {
      res.redirect("/sign_in"); 
    }
  });

  app.get("/flappy_bird", function(req, res) {

    if (req.session.user) {
      Users.findOne({
        where: {
          email: req.session.user,
        }      
        }).then(function(result) {
          if (result) {
            res.sendFile(path.join(__dirname, '../public/flappy_bird/flappy_bird.html'));
          }
        });
    }
    else {
      res.redirect("/sign_in"); 
    }
  });


  app.get("/map", function(req, res) {

    if (req.session.user) {
      Users.findOne({
        where: {
          email: req.session.user,
        }      
        }).then(function(result) {
          if (result) {
            res.render("map"); 
          }
        });
    }
    else {
      res.redirect("/sign_in"); 
    }
  });

  
  app.use(function(req, res){
    res.redirect("/");
  });

};
