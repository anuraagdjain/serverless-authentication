const slsw = require("serverless-webpack");
const nodeExternals = require("webpack-node-externals");
env = process.env.NODE_ENV === "development" ? "development" : "production";
module.exports = {
  entry: slsw.lib.entries,
  target: "node",
  mode: env,
  // Since 'aws-sdk' is not compatible with webpack,
  // we exclude all node dependencies
  // Run babel on all .js files and skip those in node_modules
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
