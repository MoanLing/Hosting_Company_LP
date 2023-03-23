const gulp = require('gulp'),
    source_folder = 'src',
    build_folder = 'dist',
    {src, dest, parallel, series} = require('gulp'),
    sass = require('gulp-sass')(require('sass')),
    browserSync = require('browser-sync').create(),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify-es').default,
    concat = require('gulp-concat');

let path = {
    src: {
        html: source_folder + '/*.html',
        scss: source_folder + '/scss/*.scss',
        img: source_folder + '/img/**/*.{png,svg,jpeg,jpg,jiff,gif.webp,ico}',
        js: source_folder + '/js/*.js'
    },

    build: {
        html: build_folder + '/',
        css: build_folder + '/css',
        img: build_folder + '/img',
        js: build_folder + '/js'
    }
}

function html() {
    return src(path.src.html)
        .pipe(dest(path.build.html))
        .pipe(browserSync.stream())
}
function scssConv() {
    return src(path.src.scss)
        .pipe(concat('style.min.scss'))
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(rename('style.min.css'))
        .pipe(dest(path.build.css))
        .pipe(browserSync.stream())
}

function jssConv() {
    return src(path.src.js)
        .pipe(concat('script.js'))
        .pipe(uglify())
        .pipe(rename('script.min.js'))
        .pipe(dest(path.build.js))
        .pipe(browserSync.stream())
}

function imgConv() {
    return src(path.src.img)
        .pipe(dest(path.build.img))
        .pipe(browserSync.stream())
}

function bs() {
    browserSync.init({
        server: {
            baseDir: build_folder
        },
        port: 3000,
        notify: false
    })
}

function watching() {
    gulp.watch(path.src.html).on('change', browserSync.reload)
    gulp.watch(path.src.scss, scssConv)
    gulp.watch(path.src.js, jssConv)
    gulp.watch(path.src.img, imgConv)
}

exports.build = series(html, scssConv, jssConv, imgConv, parallel(bs, watching))


