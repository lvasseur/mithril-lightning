var gulp = require('gulp');
var connect = require('gulp-connect');

gulp.task('connect', function() {
  connect.server({
    name: 'Mithril Lightining',
    port: 8001,
    root: ['src', 'node_modules/@salesforce-ux', 'node_modules/mithril'],
    livereoad: true
  });
});

gulp.task('js', function () {
  gulp.src('./src/**/*.js')
    .pipe(connect.reload())
});

gulp.task('html', function () {
  gulp.src('./src/**/*.html')
    .pipe(connect.reload())
});

gulp.task('watch', function () {
  gulp.watch(['./src/**/*.js'], ['js']);
  gulp.watch(['./src/**/*.html'], ['html']);
});

gulp.task('default', function() {

});

gulp.task('default', ['connect', 'watch']);