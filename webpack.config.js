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
              test: /\.nearley$/,
              use: [
                'nearley-loader',
              ],
            },
        ]
      }
    
};

