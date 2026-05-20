const router = require("express").Router();
const UserAccount = require("../models/UserAccount.model");
const perm = require("../middleware/perm.middleware");


router.get("/users/", perm.checkAdmin, async (req, res) => {
    let data = await UserAccount.GetAll("username, fullname, role, drivefolder, isactive");
    
    res.json({
        message: "Ok",
        data: data
    });
});

module.exports = router;