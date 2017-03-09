var gulp       = require('gulp'),
    gutil      = require('gulp-util'),
    coffee     = require('gulp-coffee'),
    browserify = require('gulp-browserify'),
    compass    = require('gulp-compass'),
    webserver  = require('gulp-webserver'),
    gulpif     = require('gulp-if'),
    uglify     = require('gulp-uglify'),
    minifyHTML = require('gulp-minify-html'),
    jsonminify = require('gulp-jsonminify'),
    imagemin   = require('gulp-imagemin'),
    pngcrush   = require('imagemin-pngcrush'),
    concat     = require('gulp-concat'),
    plumber    = require('gulp-plumber')

    gulp.task('default', function(){

    })
    var coffeeSources = ['components/coffee/tagline.coffee'];
    var jsSources = [
      'components/scripts/rclick.js',
      'components/scripts/pixgrid.js',
      'components/scripts/tagline.js',
      'components/scripts/template.js'
    ];

    gulp.task('coffee', function() {
      gulp.src(coffeeSources)
        .pipe(coffee({ bare: true })
          .on('error', gutil.log))
          .pipe(gulp.dest('components/scripts'))
    });

    gulp.task('js', function() {
      gulp.src(jsSources)
      .pipe(concat('script.js'))
      .pipe(browserify())
      .pipe(gulp.dest('builds/development/js'))
    });

var sassSources = ['builds/components/sass/style.scss'];

gulp.task('compass', function() {
  gulp.src(sassSources)
      .pipe(plumber())
      .pipe(compass({
        sass: 'components/sass',
        css: 'builds/development/css',
        image: 'builds/development/images',
        style: 'expanded'
      })
      .on('error', gutil.log))
      .pipe(gulp.dest('builds/development/css'))
  });
//detetcts file changes saves and refreshes browser
gulp.task('watch', function() {
  gulp.watch(coffeeSources, ['coffee']);
  gulp.watch(jsSources, ['js']);
  gulp.watch('components/sass/*.scss', ['compass']);
});

// fires up the server when workflow launches
gulp.task('serve', function() {
  gulp.src('builds/development/')
    .pipe(webserver({
      port:'8080',
      livereload: true,
      open: true
    }));
});
//default tas runner. the order matters (left to right)
gulp.task('default', ['coffee', 'js', 'compass', 'serve', 'watch']);
