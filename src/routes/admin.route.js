const router = require("express").Router();
const UserAccount = require("../models/UserAccount.model");

const isAdmin = (req, res, next) => {
    if (!req.session.user || req.session.user.role !== 'admin') {
        return res.status(403).redirect('/');
    }
    next();
};

router.get("/users", isAdmin, async (req, res) => {
    try {
        const users = await UserAccount.GetAll();
        res.render("admin/usermanage", { users: users || [] });
    } catch (error) {
        console.error(error);
        res.render("admin/usermanage", { users: [] });
    }
});

router.get("/dashboard", isAdmin, (req, res) => {
    res.render("admin/dashboard");
});

module.exports = router;
