const gulp = require("gulp");
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();

function server(done) {
  browserSync.init({
    server: {
      baseDir: "./development"
    },
  });
  done();
}

function buildStyles() {
  return gulp.src('./development/scss/main.scss')
      .pipe(sourcemaps.init())
      .pipe(sass({
        //outputStyle: 'compressed'
      }).on('error', sass.logError))
      .pipe(autoprefixer())
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest('./development/css'))
      .pipe(browserSync.stream());
}

function watcher(done) {
  gulp.watch("./development/scss/**/*.scss", gulp.series(buildStyles));
  gulp.watch("./development/*.html").on('change', browserSync.reload);
  done();
}

module.exports.buildStyles = buildStyles;
module.exports.default = gulp.series(server, buildStyles, watcher);