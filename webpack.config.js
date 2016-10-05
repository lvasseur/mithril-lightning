const webpack = require("webpack");
const path = require("path");

const PATHS = {
  src: path.join(__dirname, "src"),
  dist: path.join(__dirname, "dist")
};

module.exports = {
  entry: {
    bundle: PATHS.src + "/lightning.es6", // bundle all Mithril Lightning components
    // individual entries Mithril Lightning components
  },
  output: {
    path: PATHS.dist,
    filename: "[name].js",
    chunkFilename: "[id].js",
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
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
      }
    ]
  }
};