const loader = {
    route: {
        home: require("../routes/home.route"),
        useraccount: require("../routes/UserAccount.route")
    },
    googleApi: ("./api/google.json"),
    drive: {
        parentFolderID: "1hhIkkJ9ItXQ6ZNWGNbz_OJIgsmWC6o4g"
    },
    view: {
        user: {
            home: "../views/user/index.ejs",
            login: "../views/user/login.ejs",
            register: "../views/user/register.ejs"
        }
    }
}

console.log(loader);

module.exports = loader;