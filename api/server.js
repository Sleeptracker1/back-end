require("dotenv").config();

const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const usersRoute = require('./users')

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use('/api/users', usersRoute)

server.get("/", (req, res) => {
  res.send(`The API Server is Up and Running!!!`);
});

module.exports = server;
