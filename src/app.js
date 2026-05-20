const express = require("express");
const exapp = express();
const path = require("path");
const loader = require("./config/loader.config");
const bodyParser = require("body-parser");

const session = require("express-session");

exapp.use(session({
    secret: "abc123",
    resave: false,
    saveUninitialized: false
}));

exapp.set("view engine", "ejs");
exapp.set("views", path.join(__dirname, "views"));
exapp.use(bodyParser.urlencoded({ extended: true }));

exapp.use(bodyParser.json());
// 

exapp.use(
    '/bootstrap',
    express.static(
        path.join(
            __dirname,
            '../node_modules/bootstrap/dist'
        
    ))
);

// Truyền thông tin đăng nhập 
exapp.use((req, res, next) => {
    res.locals.user = {
        username: req.session.user ? req.session.user.username : null,
        name: req.session.user ? req.session.user.fullname : null,
        role: req.session.user ? req.session.user.role : null
    };
    next();
});

exapp.use("/public", express.static(path.join(__dirname, "public")));
exapp.use("/", loader.route.home);
exapp.use("/service/", loader.route.useraccount);

exapp.listen(3000);


module.exports = exapp;