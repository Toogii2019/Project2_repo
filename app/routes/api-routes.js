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
  // create application/json parser
  var jsonParser = bodyParser.json()

  // create application/x-www-form-urlencoded parser
  var urlencodedParser = bodyParser.urlencoded({ extended: false })
  // Each of the below routes just handles the HTML page that the user gets sent to.
  app.use(bodyParser.json()); 
  app.use(bodyParser.urlencoded({ extended: true })); 
  
  // index route loads view.html
  app.post("/api/new_user", function(req, res) {
      console.log("User Data:");
      // console.log(req.body);
      passwordHash = writeUserToDb(req.body.firstName, req.body.lastName, req.body.email, req.body.password);
      res.end();
    });

  app.post("/api/sign", function(req, res) {
    // console.log(req);
    Users.findOne({
        where: {
          email: req.body.email,
        }      
        }).then(function(result) {
          if (! result) {
            res.redirect("/sign_in");
            return;
          }
            // if (err) {
            //     throw err;
            // }
      
            bcrypt.compare(req.body.password, result.password, function(err, authenticated) {
              console.log(authenticated);
              if (authenticated) {
                res.redirect("/home");
              }
              else {
                return res.redirect("/sign_in");
              }
            });
        })
  });

  app.get("/api/users", function(req, res) {
    Users.findAll({}).then(function(results) {
      // results are available to us inside the .then
      // console.log(req);
      res.json(results);
    });
  });

};


