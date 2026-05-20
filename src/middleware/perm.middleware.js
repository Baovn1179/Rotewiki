const perm = {
    isLogin: (req, res) => {
        return !!req?.session?.user;
    },
    isAdmin: (req, res) => {
        let user = req?.session?.user;

        return user && user.role == "admin";
    },
    checkAdmin: (req, res, next) => {
        if (perm.isAdmin(req, res))
            return next();

        res.json({
            data: "failure",
            message: "Đồng chí không đủ thẩm quyền để truy cập tài nguyên này."
        });
    },
    checkLogin: (req, res, next) => {
        if (perm.isLogin(req, res))
            return next();

        res.json({
            data: "failure",
            message: "Đồng chí chưa đăng nhập"
        })
    }
}

module.exports = perm;