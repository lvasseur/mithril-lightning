var gulp = require('gulp');
var gutil = require("gulp-util");
var connect = require('gulp-connect');
var webpack = require('webpack-stream');
var webpackConfig = require("./webpack.config.js");

gulp.task('connect', function() {
  connect.server({
    name: 'Mithril Lightining',
    port: 8001,
    root: ['docs', 'src', 'dist', 'node_modules/@salesforce-ux/design-system', 'node_modules/mithril', 'node_modules/faker/build/build'],
    livereload: {
      port: 35730
    }
  });
});

gulp.task('js', function () {
  gulp.src(['./src/**/*.js', './entry.js', './webpack.config.js'])
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

gulp.task('watch', function () {
  gulp.watch(['./src/**/*.js', './entry.js', './webpack.config.js'], ['js', 'webpack']);
  gulp.watch(['./src/**/*.html', './docs/**/*.html'], ['html', 'webpack']);
  gulp.watch(['./docs/styles/*.css'], ['styles'])
});

gulp.task('webpack', function () {
  console.log(webpackConfig);
  return gulp.src('src/entry.js')
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest('dist/'));
});

gulp.task('default', function() {

});

gulp.task('default', ['connect', 'watch']);