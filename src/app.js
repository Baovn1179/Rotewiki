const express = require("express");
const exapp = express();
const path = require("path");
const loader = require("./config/loader.config");
const bodyParser = require("body-parser");

exapp.set("view engine", "ejs");
exapp.set("views", path.join(__dirname, "views"));
exapp.use(bodyParser.urlencoded({ extended: true }));

exapp.use(bodyParser.json());


exapp.use(
    '/bootstrap',
    express.static(
        path.join(
            __dirname,
            '../node_modules/bootstrap/dist'
        
    ))
);


exapp.use("/public", express.static(path.join(__dirname, "public")));
exapp.use("/", loader.route.home);
exapp.use("/service/", loader.route.useraccount);

exapp.listen(3000);


module.exports = exapp;