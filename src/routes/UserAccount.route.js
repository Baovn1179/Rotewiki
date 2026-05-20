const router = require("express").Router();
const UserAccount = require("../models/UserAccount.model");


router.post("/login", async (req, res) => {
    if (Object.keys(req.body).length === 0) {
        return res.json({
            data: "failure",
            message: "Dữ liệu đăng nhập không hợp lệ."
        });
    }

    const {username, password} = req.body;

    try {
        const user = await UserAccount.FindUserByLogin({username, password});

        if (user) {
            req.session.user = {
                username: user.username,
                fullname: user.fullname,
                role: user.role,
                isActive: user.isactive || user.IsActive || false
            };

            res.cookie("user", user.username, {
                httpOnly: true,
                maxAge: 24 * 60 * 60 * 1000
            });

            return res.json({
                data: "success",
                message: "Đăng nhập thành công!",
                user: req.session.user
            });
        }

        return res.json({
            data: "failure",
            message: "Tên đăng nhập hoặc mật khẩu không đúng."
        });
    } catch (error) {
        console.error(error);
        return res.json({
            data: "failure",
            message: "Lỗi máy chủ khi đăng nhập."
        });
    }
});

router.post("/register", (req, res) => {
    if (Object.keys(req.body).length != 0) {
        res.json({
            data: "success"
        })
    }
    else res.send({
        data: "failure"
    });

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