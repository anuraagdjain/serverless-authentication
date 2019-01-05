const slsw = require("serverless-webpack");
const nodeExternals = require("webpack-node-externals");
const TerserPlugin = require('terser-webpack-plugin');

const env = process.env.NODE_ENV === "production" ? "production" : "development";
module.exports = {
  entry: slsw.lib.entries,
  target: "node",
  mode: env,
  externals: [nodeExternals()],
  optimization: {
    minimizer: [new TerserPlugin()],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        include: __dirname,
        exclude: /node_modules/
      }
    ]
  }
};
