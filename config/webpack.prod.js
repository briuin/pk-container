const { merge } = require("webpack-merge");
var path = require("path");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const commonConfig = require("./webpack.common");
const deps = require("../package.json").dependencies;
const CopyPlugin = require("copy-webpack-plugin");

const prodConfig = {
  mode: "production",
  output: {
    path: path.resolve(process.cwd(), "dist"),
    filename: "[name].[contenthash].js",
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyPlugin({
      patterns: [{ from: "public" }],
    }),
    new ModuleFederationPlugin({
      name: "pk-container",
      filename: "remoteEntry.js",
      remotes: {
        floatingMenu: "floatingMenu@https://briuin.github.io/floating-menu/remoteEntry.js",
        pkConnect: "pkConnect@https://briuin.github.io/pk-connect/remoteEntry.js",
      },
      shared: [
        {
          ...deps,
        },
      ],
    }),
  ],
};

module.exports = merge(commonConfig, prodConfig);
