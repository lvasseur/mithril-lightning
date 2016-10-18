const webpack = require("webpack");
const path = require("path");

const PATHS = {
  src: path.join(__dirname, "src"),
  dist: path.join(__dirname, "dist")
};

module.exports = {
  devtool: "eval",
  entry: {
    bundle: PATHS.src + "/lightning.js", // bundle all Mithril Lightning components
    // individual entries Mithril Lightning components
    datatable: PATHS.src + "/datatable/index.js"
  },
  output: {
    path: PATHS.dist,
    filename: "[name].js",
    chunkFilename: "[id].js",
  },
  resolve: {
    root: path.resolve(PATHS.src),
    extensions: ['', '.js', '.jsx'],
    moduleDirectories: ['node_modules']
  },
  watch: true,
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
          sourceMaps: true
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      }
    ]
  }
};