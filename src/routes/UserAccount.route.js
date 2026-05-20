const router = require("express").Router();
const UserAccount = require("../models/UserAccount.model");

router.post("/login", (req, res) => {
    if (Object.keys(req.body).length != 0) {
        const {username, password} = req.body;

        UserAccount.FindUserByLogin({username, password}).then(user => {
            console.log(user);
            if (user) {
                res.json({
                    data: "success",
                    message: "Đăng nhập thành công!"
                });
            } else {
                res.json({
                    data: "failure",
                    message: "Tên đăng nhập hoặc mật khẩu không đúng."
                });
            }
        });

    }
    else res.json({
        data: "failure",
        message: "Dữ liệu đăng nhập không hợp lệ."
    });
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