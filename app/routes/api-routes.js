// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var path = require("path");
var writeUserToDb = require("../../lib/createUser.js");
var Users = require("../models/users.js");
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();
const bcrypt = require("bcryptjs");

// Routes
// =============================================================
module.exports = function(app) {

  app.use(bodyParser.json()); 
  app.use(bodyParser.urlencoded({ extended: true })); 
  
  app.post("/api/new_user", function(req, res) {
    writeUserToDb(req.body.firstName, req.body.lastName, req.body.email, req.body.password);
    res.redirect("/sign_in");
  });

  app.post("/api/sign", function(req, res) {
    Users.findOne({
        where: {
          email: req.body.email,
        }      
        }).then(function(result) {
          if (! result) {
            res.redirect("/sign_in");
            return;
          }
      
          bcrypt.compare(req.body.password, result.password, function(err, authenticated) {
            console.log(authenticated);
            
            if (authenticated) {
              req.session.user = req.body.email;
              console.log(req.session.user);
              res.sendFile(path.join(__dirname, "../public/index.html"));
            }
            else {
              res.redirect("/sign_in");
            }
          });
        })
  });

  app.get("/api/users", function(req, res) {
    Users.findAll({}).then(function(results) {

      res.json(results);
    });
  });

};


