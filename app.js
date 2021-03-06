require("dotenv").config();

var createError = require("http-errors");
const bodyParser = require("body-parser");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const mongoose = require("mongoose");

const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
var passport = require("passport");
require("./passport/passport-set-up");

mongoose
  .connect("mongodb://localhost/booking-project", { useNewUrlParser: true })
  .then(x => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });
MONGODB_URI = "mongodb://localhost/booking-projects";
const app_name = require("./package.json").name;
const debug = require("debug")(
  `${app_name}:${path.basename(__filename).split(".")[0]}`
);

const app = express();
app.use(logger("dev"));
//app.use(express.json());
app.use(bodyParser.json());
// app.use(express.urlencoded({ extended: false }));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// catch 404 and forward to error handler
// catch 404 and forward to error handler

app.use(
  session({
    resave: true,
    saveUninitialized: true,

    secret: "eXUW6iJ6=2h}yBC36P^;MmJ+fpYiU8A[Mg2KNRAj?D",

    store: new MongoStore({ url: process.env.MONGODB_URI })
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
  res.locals.currentUser = req.user;

  next();
});
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
app.use(express.static(path.join(__dirname, "public")));
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get("env") === "development" ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render("error");
// });
var indexRouter = require("./routes/index");
// var usersRouter = require("./routes/users");
app.use("/", indexRouter);

module.exports = app;
