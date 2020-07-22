const express = require('express');
var path = require("path");
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const dotenv = require('dotenv').config();
require('./config/db'); // const db
const indexRouter = require('./routes/index');
const apiRouter = require('./routes/api');
const apiResponse = require('./controller/response/apiResponse');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Route Prefixes
app.use("/", indexRouter);
app.use("/api/", apiRouter);



// throw 404 if URL not found
app.all("*", function(req, res) {
    return apiResponse.notFoundResponse(res, "Page not found");
});

app.use((err, req, res) => {
    return apiResponse.unauthorizedResponse(res, err.message);
    if(err.name == "UnauthorizedError"){
        return apiResponse.unauthorizedResponse(res, err.message);
    }
});
module.exports = app;
