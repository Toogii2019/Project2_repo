var Users = require("../app/models/users.js")

const bcrypt = require("bcryptjs");
const Game = require("../app/models/game.js");

module.exports = function encryptPasswordAndWriteToDB(fname,lname,uname,pwd, res) {

  // Check if user exist already!!
    let username_available = true;
    Users.findOne({
      where: {
        email: uname,
      }      
      }).then(function(result) {
        if (result) {
          username_available = false;
        }
        if (username_available == true) {
          bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(pwd, salt, function(err, hash) {
                Users.create({
                  first_name: fname,
                  last_name: lname,
                  email: uname,
                  password: hash,
                }).then(function(results) {

                  Game.create({
                    email: uname,
                    score: 0,
                  }).then(function(results) {
                    var messageData = {msg: "Registered Successfully"};
                    res.render("signin", {message: messageData});
                  })
                });
              });
            });
          }
        else {
          var messageData = {msg: "User Already Exists"};
          res.render("registration", {message: messageData});

        }
      });
  
  }

