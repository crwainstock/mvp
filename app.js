var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
// var usersRouter = require("./routes/users");

var app = express();
// app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, "public")));

// I'm not sure why, but there is something wrong here. The Heroku build was working (minus fetching from mylibrary DB),
// and then it stopped (404 error, app not found). I tried tweaking this a bit per instructions online without success.
// The app runs as it should locally, though, without this bit.

// Location of static assets
// app.use(express.static(path.join(__dirname, "/client/build")));

// // (All of your API routes should be here)
// // Respond with index.html for unmatched routes
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "/client/build/index.html"));
// });

app.use("/", indexRouter); //This is the base URL
// app.use("/users", usersRouter);

module.exports = app;
