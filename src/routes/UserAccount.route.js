const router = require("express").Router();

router.get("/login", (req, res) => {
    
});

router.get("/register", (req, res) => {
    res.send("hello");
    console.log(req.body);
});

module.exports = router;