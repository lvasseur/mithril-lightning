var gulp = require('gulp');
var gutil = require("gulp-util");
var connect = require('gulp-connect');
var webpack = require('webpack');
var WebpackDevServer = require("webpack-dev-server");
var webpackConfig = require("./webpack.config.js");

gulp.task('connect', function() {
  connect.server({
    name: 'Mithril Lightining',
    port: 8001,
    root: ['docs', 'src', 'node_modules/@salesforce-ux/design-system', 'node_modules/mithril', 'node_modules/faker/build/build'],
    livereload: true
  });
});

gulp.task('js', function () {
  gulp.src('./src/**/*.js')
    .pipe(connect.reload())
});

gulp.task('html', function () {
  gulp.src(['./src/**/*.html', './docs/**/*.html'])
    .pipe(connect.reload())
});

gulp.task('styles', function() {
  gulp.src(['./docs/styles/*.css'])
    .pipe(connect.reload())
});

gulp.task("webpack-dev-server", function(callback) {
  // modify some webpack config options
  var myConfig = Object.create(webpackConfig);
  myConfig.devtool = "eval";
  myConfig.debug = true;

  // Start a webpack-dev-server
  new WebpackDevServer(webpack(myConfig), {
    publicPath: myConfig.output.publicPath,
    stats: {
      colors: true
    }
  }).listen(8080, "localhost", function(err) {
    if(err) throw new gutil.PluginError("webpack-dev-server", err);
    gutil.log("[webpack-dev-server]", "http://localhost:8080/webpack-dev-server/index.html");
  });
});

gulp.task('watch', function () {
  gulp.watch(['./src/**/*.js'], ['js']);
  gulp.watch(['./src/**/*.html', './docs/**/*.html'], ['html']);
  gulp.watch(['./docs/styles/*.css'], ['styles'])
});

gulp.task('default', function() {

});

gulp.task('default', ['connect', 'watch']);