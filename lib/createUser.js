var Users = require("../app/models/users.js")

const bcrypt = require("bcryptjs");

module.exports = function encryptPasswordAndWriteToDB(fname,lname,uname,pwd) {
    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(pwd, salt, function(err, hash) {
          Users.create({
            first_name: fname,
            last_name: lname,
            email: uname,
            password: hash,
          }).then(function(results) {
            // res.end();
          });
      
      });
  });
  }

