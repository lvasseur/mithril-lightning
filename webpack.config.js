var webpack = require('webpack');

module.exports = {
  entry: './entry.js',
  output: {
    path: __dirname + "/dist",
    filename: 'bundle.js',
    publicPath: '/dist'
  },
  watch: true,
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      minimize: true
    })
  ]
};