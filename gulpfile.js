const gulp = require('gulp')
const sass = require('gulp-sass')(require('sass'))
const browserify = require('browserify')
const source = require('vinyl-source-stream')

function bundleHTML() {
  return gulp.src('src/**/*.html').pipe(gulp.dest('dist'))
}

function moveFile() {
  return gulp.src('src/images/**').pipe(gulp.dest('dist/images'))
}

function moveFont() {
  return gulp.src('src/font/**').pipe(gulp.dest('dist/font'))
}

function styles() {
  return gulp
    .src('src/style/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dist/style/css'))
}

function bundleJS() {
  return browserify({
    entries: [
      'src/js/index.js',
      'src/js/end.js',
      'src/js/introduce.js',
      'src/js/gallery.js',
    ],
    debug: true,
  })
    .transform('babelify', { presets: ['@babel/preset-env'] })
    .bundle()
    .pipe(source('app.bundle.js'))
    .pipe(gulp.dest('dist/js'))
}

function moveJs() {
  return gulp.src('src/js/form.js').pipe(gulp.dest('dist/js'))
}

const build = gulp.parallel(
  bundleHTML,
  moveFile,
  styles,
  bundleJS,
  moveFont,
  moveJs,
)

exports.default = build
