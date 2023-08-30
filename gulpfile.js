const gulp = require("gulp");
const sass = require("gulp-sass");
const babel = require("gulp-babel");
const swc = require("gulp-swc");
const concat = require("gulp-concat");

gulp.task("compile-scss", function () {
  return gulp
    .src("src/style/**/*.scss")
    .pipe(sass())
    .pipe(concat("styles.css"))
    .pipe(gulp.dest("build"));
});

gulp.task("compile-js", function () {
  return gulp
    .src("src/**/*.js")
    .pipe(babel())
    .pipe(swc())
    .pipe(concat("bundle.js"))
    .pipe(gulp.dest("build"));
});

gulp.task("copy-html", function () {
  return gulp.src("src/**/*.html").pipe(gulp.dest("build"));
});

gulp.task("watch", function () {
  gulp.watch("src/style/**/*.scss", gulp.series("compile-scss"));
  gulp.watch("src/**/*.js", gulp.series("compile-js"));
  gulp.watch("src/**/*.html", gulp.series("copy-html"));
});

gulp.task(
  "default",
  gulp.series("compile-scss", "compile-js", "copy-html", "watch")
);
