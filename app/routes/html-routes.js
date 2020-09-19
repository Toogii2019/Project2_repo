// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var path = require("path");


// Routes
// =============================================================
module.exports = function(app) {

  // Each of the below routes just handles the HTML page that the user gets sent to.

  // index route loads view.html
  app.get("/sign_up", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/registration.html"));
  });

  app.get("/sign_in", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/signin.html"));
  });

  app.post("/sign_in", function(req, res) {
    console.log(req);
    res.end();
  });
};
