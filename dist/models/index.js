"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tearDown = exports.createTables = void 0;

var dotenv = require('dotenv');

var _require = require('../config/index'),
    Client = _require.Client;

var _require2 = require('./tableQueries'),
    tables = _require2.tables; // const app = require('../index');
// const Client = app.Client;


dotenv.config();
Client.connect().then(function () {
  console.log('Database connected');
});

var createTables = function createTables() {
  Client.query(tables).then(function (res) {
    Client.end();
  })["catch"](function (err) {
    console.log(err);
  });
}; //Delete created tables


exports.createTables = createTables;

var tearDown = function tearDown() {
  var deleteQuery = 'DROP TABLE IF EXISTS users, articles, comments, flags,gifs CASCADE';
  Client.query(deleteQuery).then(function () {
    Client.end();
  });
};

exports.tearDown = tearDown;

require('make-runnable');