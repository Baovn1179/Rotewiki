const loader = {
    route: {
        home: require("../routes/home.route"),
        service: {
            useraccount: require("../routes/service/useraccount.service.route")
        }
    },
    googleApi: ("./api/google.json"),
    drive: {
        parentFolderID: "1hhIkkJ9ItXQ6ZNWGNbz_OJIgsmWC6o4g"
    },
    view: {
        user: {
            home: "../views/user/home/index.ejs",
            login: "../views/user/home/login.ejs",
            register: "../views/user/home/register.ejs"
        }
    }
}

console.log(loader);

module.exports = loader;