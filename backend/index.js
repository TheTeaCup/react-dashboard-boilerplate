// express app
const express = require("express");
var cookieParser = require("cookie-parser");
var cors = require("cors");
var path = require("path");
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();

var app = express();
const port = 3001

const apiRoute = require("./routes/api");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.resolve('./build/')));
app.use(cors());

app.use("/api", apiRoute);

// Handle React routing, return all requests to React app
app.get('*', function(req, res) {
  res.sendFile(path.resolve('./build/index.html'));
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

module.exports = app;
