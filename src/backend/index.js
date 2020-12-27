// express app
const express = require("express");
var cookieParser = require("cookie-parser");
var cors = require("cors");
var path = require("path");
const passport = require("passport");
const session = require("express-session");
const strategy = require("passport-discord").Strategy;
const MongoStore = require("connect-mongo")(session);
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();

var app = express();
const port = 3001

const apiRoute = require("./routes/api");

/* Login functions */
passport.serializeUser((user, done) => {
    done(null, user);
  });
  passport.deserializeUser((obj, done) => {
    done(null, obj);
  });
  
  passport.use(
    new strategy(
      {
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: "http://localhost:3000/callback",
        scope: ["identify", "guilds"]
      },
      (accessToken, refreshToken, profile, done) => {
        process.nextTick(() => {
          return done(null, profile);
        });
      }
    )
  );
  
  // you can always use something else besides mongo :)
  
  app.use(
    session({
      store: new MongoStore({
        url: "mongodb://****"
      }),
      secret: "FROPT",
      resave: false,
      saveUninitialized: false
    })
  );
  
app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.resolve('./public/')));
app.use(cors());

app.use("/api", apiRoute);

// Handle React routing, return all requests to React app
app.get('*', function(req, res) {
  res.sendFile(path.resolve('./public/index.html'));
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

module.exports = app;
