const dotenv = require('dotenv');
const { Client } = require('pg');

dotenv.config();

exports.Client = new Client({ connectionString: process.env.DATABASE_URL });