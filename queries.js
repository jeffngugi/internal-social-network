const Pool = require("pg").Pool;

const pool = new Pool({
  user: "ngugi",
  host: "localhost",
  database: "socialapp",
  password: "password",
  port: 5432
});
