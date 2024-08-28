const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  mode: "production",
  entry: "./client/src/index.js",
  output: {
    path: path.resolve(__dirname, "./client/dist"),
    filename: "bundle.[contenthash].js",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./client/index.html",
      filename: "index.html",
      chunks: ["main"],
    }),
    new CleanWebpackPlugin({
      cleanOnce: true,
    }),
  ],

  optimization: {
    minimize: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
};
