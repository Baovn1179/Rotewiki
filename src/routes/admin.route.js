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
        const pendingUsers = await UserAccount.GetPendingRequests();
        res.render("admin/usermanage", {
            users: users || [],
            pendingUsers: pendingUsers || []
        });
    } catch (error) {
        console.error(error);
        res.render("admin/usermanage", {
            users: [],
            pendingUsers: []
        });
    }
});

router.get("/users/pending/:username", isAdmin, async (req, res) => {
    try {
        const user = await UserAccount.GetPendingRequestByUsername(req.params.username);
        if (!user) {
            return res.status(404).json({
                data: "failure",
                message: "Không tìm thấy hồ sơ xét duyệt của người dùng này."
            });
        }

        return res.json({
            data: "success",
            user
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            data: "failure",
            message: "Lỗi máy chủ khi lấy thông tin xét duyệt."
        });
    }
});

router.post("/users/approve", isAdmin, async (req, res) => {
    const username = req.body.username;
    if (!username) {
        return res.status(400).json({
            data: "failure",
            message: "Username không được để trống."
        });
    }

    try {
        const result = await UserAccount.ApproveUser(username);
        if (!result || (Array.isArray(result) && result.length === 0)) {
            return res.status(400).json({
                data: "failure",
                message: "Không thể duyệt người dùng này."
            });
        }

        return res.json({
            data: "success",
            message: "Đã duyệt thành viên thành công."
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            data: "failure",
            message: "Lỗi máy chủ khi xét duyệt thành viên."
        });
    }
});

router.get("/dashboard", isAdmin, (req, res) => {
    res.render("admin/dashboard");
});

module.exports = router;
