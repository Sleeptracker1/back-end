require("dotenv").config();

const sleepRouter = require("./sleep/index");

const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.get("/", (req, res) => {
  res.send(`The API Server is Up and Running!!!`);
});

server.use("/api/sleep", sleepRouter);

module.exports = server;
