'use strict'

const gulp = require('gulp')
const watch = require('gulp-watch')
const cached = require('gulp-cached')

const sass = require('gulp-sass')(require('sass'))
const postcss = require('gulp-postcss')
const autoprefixer = require('autoprefixer')

const SCSS_SOURCE = 'src/style/**/*.scss'
const SCSS_COMPILED_DEST = 'src/style/css'

gulp.task('sass:watch', function () {
  watch(SCSS_SOURCE, gulp.series(['sass', 'postcss']))
})

// Compile sass into CSS & auto-inject into browsers
function compileSCSS() {
  return gulp
    .src(SCSS_SOURCE)
    .pipe(cached('cached-css')) // only compile changed files
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(gulp.dest(SCSS_COMPILED_DEST))
  // .pipe(browserSync.stream());
}
gulp.task('sass', compileSCSS)

// Transform css & auto-inject into browsers
function transformCSS() {
  const plugins = [autoprefixer({})]
  return gulp
    .src(SCSS_COMPILED_DEST + '/**/*.css')
    .pipe(cached('cached-postcss')) // only compile changed files
    .pipe(postcss(plugins, {}))
    .pipe(gulp.dest(SCSS_COMPILED_DEST))
  // .pipe(browserSync.stream())
}
gulp.task('postcss', transformCSS)
gulp.task('compile-style', gulp.series(['sass', 'postcss']))
gulp.task('default', gulp.series(['compile-style', 'sass:watch']))
