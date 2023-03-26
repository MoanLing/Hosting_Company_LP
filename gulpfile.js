const gulp = require('gulp'),
    source_folder = 'src',
    build_folder = 'dist',
    testing_folder = 'testing',
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
        css: source_folder + '/css/*.css',
        img: source_folder + '/img/**/*.{png,svg,jpeg,jpg,jiff,gif.webp,ico}',
        js: source_folder + '/js/*.js'
    },

    build: {
        html: build_folder + '/',
        css: build_folder + '/css',
        img: build_folder + '/img',
        js: build_folder + '/js'
    },

    testing: {
        html: testing_folder + '/',
        css: testing_folder + '/css',
        img: testing_folder + '/img',
        js: testing_folder + '/js'
    }
}

function htmlBuild() {
    return src(path.src.html)
        .pipe(dest(path.build.html))
        .pipe(browserSync.stream())
}

function htmlTesting() {
    return src(path.src.html)
        .pipe(dest(path.testing.html))
        .pipe(browserSync.stream())
}

function scssConvBuild() {
    return src(path.src.scss)
        .pipe(concat('style.min.scss'))
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(concat('style.min.css'))
        .pipe(dest(path.build.css))
        .pipe(browserSync.stream())
}

function scssConvTesting() {
    return src(path.src.scss)
        .pipe(concat('style.scss'))
        .pipe(sass({outputStyle: 'expanded'}))
        .pipe(concat('style.css'))
        .pipe(dest(testing_folder + '/css'))
        .pipe(browserSync.stream())
}

function jssConvBuild() {
    return src(path.src.js)
        .pipe(concat('script.js'))
        .pipe(uglify())
        .pipe(concat('script.min.js'))
        .pipe(dest(path.build.js))
        .pipe(browserSync.stream())
}

function jssConvTesting() {
    return src(path.src.js)
        .pipe(concat('script.js'))
        .pipe(dest(path.testing.js))
        .pipe(browserSync.stream())
}

function imgConvBuild() {
    return src(path.src.img)
        .pipe(dest(path.build.img))
        .pipe(browserSync.stream())
}

function imgConvTesting() {
    return src(path.src.img)
        .pipe(dest(path.testing.img))
        .pipe(browserSync.stream())
}

function bsBuild() {
    browserSync.init({
        server: {
            baseDir: build_folder
        },
        port: 3000,
        notify: false
    })
}

function bsTesting() {
    browserSync.init({
        server: {
            baseDir: testing_folder
        },
        port: 3000,
        notify: false
    })
}

function watchingBuild() {
    gulp.watch(path.src.html, htmlBuild).on('change', browserSync.reload)
    gulp.watch(path.src.scss, scssConvBuild)
    gulp.watch(path.src.js, jssConvBuild)
    gulp.watch(path.src.img, imgConvBuild)
}

function watchingTesting() {
    gulp.watch(path.src.html, htmlTesting).on('change', browserSync.reload)
    gulp.watch(path.src.scss, scssConvTesting)
    gulp.watch(path.src.js, jssConvTesting)
    gulp.watch(path.src.img, imgConvTesting)
}

exports.build = series(htmlBuild, scssConvBuild, jssConvBuild, imgConvBuild, parallel(bsBuild, watchingBuild));

exports.testing = series(htmlTesting, scssConvTesting, jssConvTesting, imgConvTesting, parallel(bsTesting, watchingTesting));


