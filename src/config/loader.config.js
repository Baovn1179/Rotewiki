const loader = {
    route: {
        home: require("../routes/home.route")
    },
    googleApi: ("./api/google.json"),
    drive: {
        parentFolderID: "1hhIkkJ9ItXQ6ZNWGNbz_OJIgsmWC6o4g"
    },
    view: {
        user: {
            home: "../views/user/home/index.ejs"
        }
    }
}

console.log(loader);

module.exports = loader;