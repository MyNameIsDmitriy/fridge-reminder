require("dotenv").config();

const { Client } = require("pg");
const { Groceries } = require("../models/");
const { Users } = require("../models/");
const { OwnedGroceries } = require("../models/");

const client = new Client({
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),

  models: [Groceries, Users, OwnedGroceries],
});

module.exports = client;
