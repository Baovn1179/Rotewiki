const { google } = require("googleapis");
const apikey = require("../config/api/google.json");
const fs = require("fs");

const config = require("../config/loader.config");

const googleObj = {
    authorize: async () => {
        const auth = new google.auth.JWT({
            email: apikey.client_email,
            keyFile: null,
            key: apikey.private_key,
            scopes: [
                "https://www.googleapis.com/auth/drive"
            ]
        });


        return auth;
    }
}

/**
         * metadata = {
         * authClient: Google authentication,
         * file: {
         *      filename,
         *      mimetype 
         *  },
         * destination: {
         *      parent,
         *      filename
         *  }
         * }
         */
const drive = {
    uploadFile: async metadata => {
        var authClient = await googleObj.authorize();
        return new Promise((resolve, reject) => {
            var drive = google.drive({
                version: "v3",
                auth: authClient
            });

            var fileMetadata = {
                name: metadata.destination.filename,
                parents: [metadata.destination.parent]
            };

            drive.files.create({
                resource: fileMetadata,
                media: {
                    body: fs.createReadStream(metadata.file.filename),
                    mimeType: metadata.file.mimetype
                },
                fields: "id"
            });

        });
    },
    createFolder: async metadata => {
        var authClient = await googleObj.authorize();

        var drive = google.drive({
            version: "v3",
            auth: authClient
        });

        const response = await drive.files.create({

            requestBody: {
                name: metadata.file.filename,
                mimeType: "application/vnd.google-apps.folder",
                parents: [config.drive.parentFolderID]
            },

            fields: "id,name"
        });
    }
}


module.exports = drive;
