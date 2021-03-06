const webpack = require("webpack");
const path = require("path");

const PATHS = {
  src: path.join(__dirname, "src"),
  dist: path.join(__dirname, "dist")
};

module.exports = {
  cache: true,
  bail: true,
  target: "web",
  entry: {
    // individual entries Mithril Lightning components
    datatable: PATHS.src + "/components/datatable.js",
    modal: PATHS.src + "/components/modal.js",
    forms: PATHS.src + "/components/forms/forms.js",
    lookups: PATHS.src + "/components/lookups/lookups.js",
    pageheader: PATHS.src + "/components/pageheader/index.js",
    menu: PATHS.src + "/components/menu/index.js"
  },
  output: {
    path: PATHS.dist,
    filename: "[name].js",
    library: "[name]"
  },
  resolve: {
    root: path.resolve(PATHS.src),
    extensions: ['', '.js', '.jsx'],
    moduleDirectories: ['node_modules']
  },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        query: {
          cacheDirectory: true,
          presets: ["es2015"],
          plugins: [
            ["transform-regenerator"]
          ],
          sourceMaps: "inline"
        }
      }
    ]
  }
};