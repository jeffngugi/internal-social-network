const express = require("express");
const bodyParser = require("body-parser");
const { Client } = require("pg");
const app = express();
const users = require('./routes/users');
const dotenv = require('dotenv');
dotenv.config();
const connectioString = process.env.DATABASE_URL;

const client = new Client({
  connectionString: connectioString
});
//initiate database connections
client
  .connect()
  .then(() => {
    console.log("Connected to Database");
  })
  .catch(error => {
    console.log("Unable to connect to the database");
    console.error(error);
  });
// app.use((req, res) => {
//   res.json({ message: "Your request was succesful" });
// });

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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/v1/users', users);

app.use('*', (req, res) => res.status(200).send({
  message: 'Not found, try to add /api/v1 to access the api'
}))

module.exports = app;
