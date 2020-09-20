// Dependencies
// =============================================================
var express = require("express");

var app = express();
var PORT = process.env.PORT || 8080;
var session = require('express-session');
var cors = require('cors')


// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());



// Static directory
app.use(cors());
app.use(express.static("app/public"));
app.use(session({
  cookieName: 'session',
  secret: 'dasdsadfghd4564566784',
  resave: false,
  saveUninitialized: false,
}));
// Handlebars

var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");



// Routes
// =============================================================
require("./app/routes/api-routes.js")(app);
require("./app/routes/html-routes.js")(app);

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
