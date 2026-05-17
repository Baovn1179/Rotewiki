const loader = {
    route: {
        home: require("../routes/home.route")
    },
    googleApi: require("./api/google.json"),
    drive: {
        parentFolderID: "1hhIkkJ9ItXQ6ZNWGNbz_OJIgsmWC6o4g"
    }
}

module.exports = loader;