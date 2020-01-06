const express = require("express");
const bodyParser = require("body-parser");
const { Client } = require('./config/index');
const app = express();
const users = require('./routes/users');
const passport = require('passport');
const auth = require('./routes/auth');
const gif = require('./routes/gif');
const fileupload = require('express-fileupload');
app.use(fileupload({
  useTempFiles: true
}));
import dotenv from 'dotenv';

app.use(passport.initialize())
require('./config/passport')(passport);
dotenv.config();
// Client.connect()
//   .then(() => {
//     console.log('Database connected');
//   }).catch(err => {
//     console.log('Unable to connect to the database');
//     console.error(err);
//   });

//set headers to prevent CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});
app.use(passport.initialize())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/v1/users', users);
app.use('/api/v1/auth', auth);
app.use('/api/v1/gif', gif);

app.use('*', (req, res) => res.status(200).send({
  message: 'Not found, try to add /api/v1 to access the api'
}))

module.exports = app;
