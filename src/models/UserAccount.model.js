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
        let password = crypto.createHash("md5").update(data.password).digest("hex");
        var result = await db.Select({
            table: "useraccount",
            select: "*", 
            conditions: [
                {
                    column: "username",
                    value: username
                },
                {
                    column: "password",
                    value: password
                }
            ]
        });


        if (!result || result.length === 0) {
            return null;
        }

        return Array.isArray(result) ? result[0] : result;
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
    },
    GetAll: async () => {
        var result = await db.Select({
            table: "useraccount",
            select: "*"
        });

        return Array.isArray(result) ? result : (result ? [result] : []);
    },
    GetPendingRequests: async () => {
        const users = await db.Select({
            table: "useraccount",
            select: "*",
            conditions: [
                {
                    column: "isactive",
                    value: false
                }
            ]
        });

        const registers = await db.Select({
            table: "userlistregister",
            select: "*"
        });

        const registerArray = Array.isArray(registers) ? registers : (registers ? [registers] : []);
        const registerMap = {};
        registerArray.forEach(record => {
            if (record.username) {
                registerMap[record.username] = record.questionrecord || "";
            }
        });

        const pending = Array.isArray(users) ? users : (users ? [users] : []);
        return pending.map(user => ({
            ...user,
            questionrecord: registerMap[user.username] || ""
        }));
    },
    GetPendingRequestByUsername: async username => {
        const users = await db.Select({
            table: "useraccount",
            select: "*",
            conditions: [
                {
                    column: "username",
                    value: username
                },
                {
                    column: "isactive",
                    value: false
                }
            ]
        });

        const user = Array.isArray(users) ? users[0] : users;

        if (!user) {
            return null;
        }

        const records = await db.Select({
            table: "userlistregister",
            select: "*",
            conditions: [
                {
                    column: "username",
                    value: username
                }
            ]
        });

        const recordArray = Array.isArray(records) ? records : (records ? [records] : []);
        return {
            ...user,
            questionrecord: recordArray.length > 0 ? recordArray[0].questionrecord || "" : ""
        };
    },
    ApproveUser: async username => {
        const result = await db.Update({
            table: "useraccount",
            data: {
                isactive: true
            },
            match: {
                username: username
            }
        });

        return result;
    }
}

module.exports = UserAccount;