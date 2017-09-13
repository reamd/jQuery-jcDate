/**
 * Created by reamd on 5/28/2016.
 */
var gulp = require('gulp'),
    mincss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    rename = require('gulp-rename'),
    del = require('del');

    gulp.task('scripts', function() {
        return gulp.src('src/*.js')
            .pipe(rename({suffix: '.min'}))
            .pipe(uglify())
            .pipe(gulp.dest('dist/'))
            .pipe(notify({ message: 'Scripts task complete' }));
    });

    gulp.task('styles', function() {
        return gulp.src('src/*.css')
            .pipe(rename({suffix: '.min'}))
            .pipe(mincss())
            .pipe(gulp.dest('dist/'))
            .pipe(notify({ message: 'Styles task complete' }));
    });

    gulp.task('clean', function(cb) {
        del(['dist/'], cb)
    });

    gulp.task('default', function() {
        gulp.run('clean', 'styles', 'scripts');
    });