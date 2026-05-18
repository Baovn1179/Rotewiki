const router = require("express").Router();
const loader = require("../config/loader.config");

router.get("/", (req, res) => {
    res.render("user/home");
});


module.exports = router;