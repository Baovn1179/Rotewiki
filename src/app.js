const express = require("express");
const exapp = express();

const loader = require("./config/loader.config");

exapp.set("view engine", "ejs");

exapp.use("/", loader.route.home);




module.exports = exapp;