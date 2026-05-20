const db = require("../helpers/db.helper");
const drive = require("../services/google.service");
const crypto = require("crypto");


const UserAccount = {
    CheckUser: async username => {
        var user = await db.Select({
            table: "useraccount",
            select: "*",
            condition: {
                column: "username",
                value: username
            }
        })

        return !!user;
    },
    FindUserByLogin: async data => {
        let username = data.username;
        console.log(username);
        let password = crypto.createHash("md5").update(data.password).digest("hex");
        var user = await db.Select({
            table: "useraccount",
            select: "*", 
            condition: [
                {
                    comlumn: "username",
                    value: username
                },
                {
                    column: "password",
                    value: password
                }
            ]
        });
        return user || null;
    },
    Create: async data => {
        if (!UserAccount.CheckUser(data.username))
            return; 
        let response = await db.Insert({
            table: "useraccount",
            data: [
                {
                    username: data.username,
                    fullname: data.fullname,
                    role: data.role,
                    password: crypto.createHash("md5").update(data.password).digest("hex"),
                    drivefolder: data.drivefolder || null,
                    isactive: false
                }
            ]
        });

        await db.Insert({
            table: "userlistregister",
            data: [
                {
                    username: data.username,
                    questionrecord: data.questionrecord
                }
            ]
        });

        return response;
    }
}

module.exports = UserAccount;