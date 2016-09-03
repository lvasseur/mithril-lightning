var gulp = require('gulp');
var connect = require('gulp-connect');

gulp.task('connect', function() {
  connect.server({
    name: 'Mithril Lightining',
    port: 8001,
    root: ['tests', 'src', 'node_modules/@salesforce-ux', 'node_modules/mithril', 'node_modules/faker/build/build'],
    livereload: true
  });
});

gulp.task('js', function () {
  gulp.src('./src/**/*.js')
    .pipe(connect.reload())
});

gulp.task('html', function () {
  gulp.src(['./src/**/*.html', './tests/**/*.html'])
    .pipe(connect.reload())
});

gulp.task('styles', function() {
  gulp.src(['./tests/styles/*.css'])
    .pipe(connect.reload())
});

gulp.task('watch', function () {
  gulp.watch(['./src/**/*.js'], ['js']);
  gulp.watch(['./src/**/*.html', './tests/**/*.html'], ['html']);
  gulp.watch(['./tests/styles/*.css'], ['styles'])
});

gulp.task('default', function() {

});

gulp.task('default', ['connect', 'watch']);