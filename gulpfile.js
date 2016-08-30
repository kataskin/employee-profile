'use strict';

var gulp = require('gulp');
var jade = require('gulp-jade');
var stylus = require('gulp-stylus');
var plumber = require('gulp-plumber');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var server = require('browser-sync');
var mqpacker = require('css-mqpacker');
var minify = require('gulp-csso');
var rename = require('gulp-rename');
var imagemin = require('gulp-imagemin');
var clean = require('gulp-clean');

gulp.task('style', function() {
  return gulp.src('styl/style.styl')
    .pipe(plumber())
    .pipe(stylus())
    .pipe(postcss([
      autoprefixer({browsers: [
        'last 1 version',
        'last 2 Chrome versions',
        'last 2 Firefox versions',
        'last 2 Opera versions',
        'last 2 Edge versions'
      ]}),
      mqpacker({
        sort: true
      })
    ]))
    .pipe(gulp.dest('dist/css'))
    .pipe(minify())
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('dist/css'))
    .pipe(server.reload({stream: true}));
});

gulp.task('images', function() {
  return gulp.src('img/**/*.{png,jpg,gif,svg}')
    .pipe(imagemin({
      optimizationLevel: 3,
      progressive: true
    }))
    .pipe(gulp.dest('dist/img'));
});

gulp.task('fonts', function() {
  gulp.src('fonts/**/*.{woff,woff2}')
    .pipe(gulp.dest('dist/fonts'));
});

gulp.task('script', function() {
  gulp.src('js/**/*.js')
    .pipe(gulp.dest('dist/js'))
    .pipe(server.reload({stream: true}));
});

gulp.task('html', function() {
  gulp.src('jade/pages/*.jade')
    .pipe(jade())
    .pipe(gulp.dest('dist'))
    .pipe(server.reload({stream: true}));
});

gulp.task('clean', function () {
  return gulp.src('dist', {read: false})
    .pipe(clean());
});

gulp.task('build', ['clean'], function() {
  gulp.start(
    'fonts',
    'html',
    'script',
    'style',
    'images'
  );
});

gulp.task('serve', function() {
  server({
    server: 'dist',
    notify: false,
    open: true,
    ui: false
  });

  gulp.watch('styl/**/*.styl', ['style']);
  gulp.watch('jade/**/*.jade', ['html']);
  gulp.watch('js/**/*.js', ['script']);
  gulp.watch('img/!**!/!*.{png,jpg,gif,svg}', ['images']);
  gulp.watch('fonts/!**/!*.{woff,woff2}', ['fonts']);
});
