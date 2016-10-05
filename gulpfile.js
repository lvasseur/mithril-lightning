const gulp = require("gulp");
const connect = require("gulp-connect");

gulp.task("connect", function() {
  connect.server({
    name: "Mithril Lightining",
    port: 8001,
    root: [
      "dist", "docs",
      "node_modules/@salesforce-ux/design-system",
      "node_modules/mithril",
    ],
    livereload: {
      port: 35730
    }
  });
});

gulp.task("js", () => {
  gulp.src(["./dist/**/*.js"])
    .pipe(connect.reload())
});

gulp.task("html", () => {
  gulp.src(["./docs/**/*.html"])
    .pipe(connect.reload())
});

gulp.task("watch", () => {
  gulp.watch(["./dist/**/*.js", "./src/lightning.es6", "./webpack.config.js"], ["js"]);
  gulp.watch(["./docs/**/*.html"], ["webpack", "html"]);
});

gulp.task("default", ["connect", "watch"]);


