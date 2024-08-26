const path = require("path");

module.exports = {
  mode: "development",
  entry: "./client/src/index.js",
  output: {
    path: path.resolve(__dirname, "./"),
    filename: "bundle.js",
  },
  devServer: {
    static: "./client/",
    port: 3000,
    open: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-react"],
          },
        },
      },
    ],
  },
};
