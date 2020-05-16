"use strict";

var dotenv = require('dotenv');

var _require = require('pg'),
    Client = _require.Client;

dotenv.config();
exports.Client = new Client({
  connectionString: process.env.DATABASE_URL
});