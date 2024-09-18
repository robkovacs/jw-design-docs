const path = require("path");
var glob = require("glob");

module.exports = {
    entry: glob.sync("./src/assets/js/*.js"),
    mode: "production",
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, "dist/assets/js"),
    },
};
