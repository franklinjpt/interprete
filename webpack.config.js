const path = require("path");

module.exports = {
    entry: "./priv/index.js",
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, "public/js"),
        publicPath: "/public/",
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    }
};

