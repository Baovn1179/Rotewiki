const express = require("express");
const exapp = express();

const loader = require("./config/loader.config");

exapp.use("/", loader.route.home);




module.exports = exapp;