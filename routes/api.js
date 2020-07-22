var express = require("express");
var userRouter = require("./user");
var signRouter = require("./sign");
var app = express();
app.use("/user/", userRouter);
app.use("/sign/", signRouter);

module.exports = app;