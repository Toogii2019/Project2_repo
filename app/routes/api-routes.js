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

  // Each of the below routes just handles the HTML page that the user gets sent to.
  app.use(bodyParser.json()); 
  app.use(bodyParser.urlencoded({ extended: true })); 
  app.use(upload.array()); 
  // index route loads view.html
  app.post("/api/new_user", function(req, res) {
      console.log("User Data:");
      // console.log(req.body);
      passwordHash = writeUserToDb(req.body.firstName, req.body.lastName, req.body.email, req.body.password);
      res.end();
    });
    

  app.get("/api/users", function(req, res) {

    Users.findAll({}).then(function(results) {
      // results are available to us inside the .then
      // console.log(req);
      res.json(results);
    });
  });

  app.post("/api/sign_in", function(req, res) {
    // console.log(req);
    console.log("On it");
    console.log(req.body);
    Users.findOne({
        where: {
          email: "test@email.com"
        }      
        }).then(function(result) {
            // if (err) {
            //     throw err;
            // }
            console.log(result.password);

            bcrypt.compare("pass123", result.password, function(err, authenticated) {
              console.log(authenticated);
              if (authenticated) {
                res.sendFile(path.join(__dirname, "../public/index.html"));
              }
              else {
                res.sendFile(path.join(__dirname, "../public/signin.html"));
              }
            });
            
        })
  });
};


