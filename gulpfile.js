/**
 * Created by reamd on 12/05/2021.
 */
const fs = require('fs/promises');
const uglify = require('gulp-uglify');
const notify = require("gulp-notify");
const rename = require("gulp-rename");
const cssmin = require('gulp-cssmin');
const { series, src, dest } = require('gulp');

function scripts() {
    return src('src/*.js')
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(dest('dist/'))
    .pipe(notify('Scripts task complete'));
}

function styles() {
    return src('src/*.css')
    .pipe(rename({suffix: '.min'}))
    .pipe(cssmin())
    .pipe(dest('dist/'))
    .pipe(notify('Styles task complete'));
}

async function clean() {
    await fs.rmdir('dist/', { recursive: true });
    console.log('清除完成');
}

exports.clean = clean;
exports.default = series(clean, styles, scripts);