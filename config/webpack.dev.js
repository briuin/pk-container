const { merge } = require("webpack-merge");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const commonConfig = require("./webpack.common");
const deps = require("../package.json").dependencies;
const CopyPlugin = require("copy-webpack-plugin");

const devConfig = {
  mode: "development",
  devServer: {
    port: 8080,
    historyApiFallback: {
      index: "index.html",
    },
  },
  plugins: [
    new CopyPlugin({
      patterns: [{ from: "public" }],
    }),
    new ModuleFederationPlugin({
      name: "pk-container",
      filename: "remoteEntry.js",
      remotes: {
        floatingMenu: "floatingMenu@http://localhost:8083/remoteEntry.js",
        pkConnect: "pkConnect@http://localhost:8082/remoteEntry.js",
        game: "gameRockPaperScissors2@http://localhost:8085/remoteEntry.js",
        account: "pkAccount@http://localhost:8086/remoteEntry.js",
      },
      shared: [
        {
          ...deps,
        },
      ],
    }),
  ],
};

module.exports = merge(commonConfig, devConfig);
