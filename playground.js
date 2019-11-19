const express = require("express");
const bodyParser = require("body-parser");
const { Client } = require("pg");

const app = express();
const port = 3000;
const connectionString = "postgres://ngugi:password@localhost:5432/socialapp";

const client = new Client({
  connectionString: connectionString
});

client.connect().then(() => {
  console.log("Database connected");
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ info: "Node.js, Express, Postgres API" });
});

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
