"use strict";

var express = require("express");

var bodyParser = require("body-parser");

var app = express();

var users = require('./routes/users');

var passport = require('passport');

var auth = require('./routes/auth');

var gif = require('./routes/gif');

var articles = require('./routes/article');

var fileupload = require('express-fileupload');

app.use(fileupload({
  useTempFiles: true
}));

var dotenv = require('dotenv');

app.use(passport.initialize());

require('./config/passport')(passport);

dotenv.config(); //set headers to prevent CORS

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
  next();
});
app.use(passport.initialize());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use('/api/v1/users', users);
app.use('/api/v1/auth', auth);
app.use('/api/v1/gifs', gif);
app.use('/api/v1/articles', articles);
app.use('*', function (req, res) {
  return res.status(200).send({
    message: 'Not found, try to add /api/v1 to access the api'
  });
});
module.exports = app;