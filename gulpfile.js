const gulp = require("gulp");
const connect = require("gulp-connect");
const webpack = require("webpack-stream");
const webpackConfig = require("./webpack.config.js");


gulp.task("connect", function() {
  connect.server({
    name: "Mithril Lightining",
    port: 8001,
    root: [
      "docs", "dist",
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


gulp.task("webpack", () => {
  return gulp.src("src/lightning.js")
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest("dist/"));
});


gulp.task("watch", () => {
  gulp.watch([
    "./src/lightning.js",
    "./src/**/*.js",
    "./src/**/*.jsx",
    "./dist/**/*.js",
    "./webpack.config.js"
  ], ["webpack", "js"]);
  gulp.watch(["./docs/**/*.html"], ["html"]);
});

gulp.task("default", ["connect", "watch"]);


