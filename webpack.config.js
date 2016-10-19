const webpack = require("webpack");
const path = require("path");

const PATHS = {
  src: path.join(__dirname, "src"),
  dist: path.join(__dirname, "dist")
};

module.exports = {
  cache: true,
  entry: {
    // individual entries Mithril Lightning components
    datatable: PATHS.src + "/datatable/datatable.js"
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
            ["transform-regenerator"],
            ["transform-react-jsx", {
              "pragma": "m"
            }]
          ],
          sourceMaps: "inline"
        }
      }
    ]
  }
};