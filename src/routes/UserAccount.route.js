const router = require("express").Router();
const UserAccount = require("../models/UserAccount.model");

router.get("/login", (req, res) => {
    
});

router.post("/register", (req, res) => {
    if (Object.keys(req.body).length != 0) {
        res.send("1");
    }
    else res.send("0");

    UserAccount.Create({
        username: req.body.username,
        fullname: req.body.fullname,
        email: req.body.email,
        role: "ctv",
        password: req.body.password,
        questionrecord: req.body.questionrecord
    });

});

module.exports = router;