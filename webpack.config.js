const path = require('path');

module.exports = {
    mode: "development",
    entry: "./js/script.js",
    devServer: {
        contentBase: "./docs"
    },
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "docs")
    },
    resolve: {
        extensions: ['.js']
    }
}