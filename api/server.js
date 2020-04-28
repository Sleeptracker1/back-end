require("dotenv").config();

const usersRouter = require("./users/index");
const sleepRouter = require("./sleep/index");

const authorization = require("./users/middleware/restrict");

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

server.use("/api/users", usersRouter);
server.use("/api/sleep", authorization, sleepRouter);

module.exports = server;
