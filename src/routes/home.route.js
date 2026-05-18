const router = require("express").Router();
const loader = require("../config/loader.config");

router.get("/", (req, res) => {
    res.render(loader.view.user.home);
});


module.exports = router;