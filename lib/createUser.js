var Users = require("../app/models/users.js")

const bcrypt = require("bcryptjs");

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
                  res.render("signin", {message: "Registered Successfully"});
                });
              });
            });
          }
        else {
          res.render("registration", {message: "User Already Exists"})

        }
      });
  
  }

