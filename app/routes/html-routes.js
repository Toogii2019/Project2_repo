// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var path = require("path");
var session = require('express-session');

var sess;

// Routes
// =============================================================
module.exports = function(app) {
  app.use(session({secret: 'dasdsadfasfasf'}));
  // Each of the below routes just handles the HTML page that the user gets sent to.

  // index route loads view.html
  app.get("/sign_up", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/registration.html"));
  });

  app.get("/sign_in", function(req, res) {
    sess = req.session;
    console.log(sess.email);
    res.sendFile(path.join(__dirname, "../public/signin.html"));
  });

  app.get("/home", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });




};
