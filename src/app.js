const express = require("express");
const exapp = express();
const path = require("path");
const loader = require("./config/loader.config");

exapp.set("view engine", "ejs");
exapp.set("views", path.join(__dirname, "views"));


exapp.use(
    '/bootstrap',
    express.static(
        path.join(
            __dirname,
            'node_modules/bootstrap/dist'
        )
    )
);

exapp.use("/", loader.route.home);

exapp.listen(3000);




module.exports = exapp;