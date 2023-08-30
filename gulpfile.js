const gulp = require("gulp");
const ts = require("gulp-typescript");

const tsProject = ts.createProject("tsconfig.json");

gulp.task("compile-ts", function () {
  return tsProject.src().pipe(tsProject()).js.pipe(gulp.dest("build"));
});

gulp.task("copy-html", function () {
  return gulp.src("src/**/*.html").pipe(gulp.dest("build"));
});

gulp.task("watch", function () {
  gulp.watch("src/**/*.ts", gulp.series("compile-ts"));
  gulp.watch("src/**/*.html", gulp.series("copy-html"));
});

gulp.task("default", gulp.series("compile-ts", "copy-html", "watch"));
