const db = require("../helpers/db.helper");
const drive = require("../services/google.service");
const crypto = require("crypto");


const UserAccount = {
    CheckUser: async username => {
      var user = await db.Select({
        table: "useraccount",
        select: "*"
      })
      
      console.log(user);
    },
    Create: async data => {
        await db.Insert({
            table: "useraccount",
            data: [
                {
                    username: data.username,
                    fullname: data.fullname,
                    role: data.role,
                    password: crypto.createHash("md5").update(data.password).digest("hex"),
                    drivefolder: null,
                    isactive: true
                }
            ]
        });
    }
}

if (!UserAccount.CheckUser("baovn1179")) {
    UserAccount.Create({
        username: "A",
        fullname: "Nguyen Van A",
        role: "user",
        password: null,
        drivefolder: null
    })
}