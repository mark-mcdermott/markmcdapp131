const gulp = require('gulp');
const babelify = require('babelify');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');

gulp.task('scripts', (done) => {
  return browserify(['./app/assets/javascript/src/Block.js', './app/assets/javascript/src/emoji-tetrominos.js'])
  .transform(babelify)
  .bundle()
  .pipe(source('emoji-tetrominos.js'))
  .pipe(gulp.dest('app/assets/javascript/dist'));
  done();
});