'use strict'
var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
	rename = require("gulp-rename"),
	sass = require('gulp-ruby-sass'),
	sourcemaps = require('gulp-sourcemaps'),
	uglify = require('gulp-uglify'),
	rigger = require('gulp-rigger'),
	autoprefixer = require('gulp-autoprefixer'),
	csso = require('gulp-csso'),
	csscomb = require('gulp-csscomb'),
	csslint = require('gulp-csslint'),
	imagemin = require('gulp-imagemin'),
	pngquant = require('imagemin-pngquant'),
    rimraf = require('rimraf'),
    browserSync = require("browser-sync"),
    reload = browserSync.reload;

//Path: build, src, watch
var path = {
    build: {
        html: 'build/',
        js: 'build/script/',
        polyfills: 'build/polyfills/',
        style: 'build/style/',
        img: 'build/img/',
        fonts: 'build/fonts/'
    },
    src: { 
        html: 'src/*.html',
        js: 'src/script/main.js',
        polyfills: 'src/polyfills/**/*.*',
        style: 'src/scss/style.scss',
        img: 'src/img/**/*.*',
        fonts: 'src/fonts/**/*.*'
    },
    watch: { 
        html: 'src/**/*.html',
        js: 'src/script/**/*.js',
        polyfills: 'src/polyfills/**/*.*',
        style: 'src/scss/**/*.scss',
        img: 'src/img/**/*.*',
        fonts: 'src/fonts/**/*.*'
    },
    clean: './build'
};    

 //Server
var config = {
    server: {
        baseDir: "./build"
    },
    host: 'localhost',
    port: 9000,
    logPrefix: "Frontend_Project"
};

 gulp.task('webserver', function () {
    browserSync(config);
});

//HTML
gulp.task('html:build', function () {
    gulp.src(path.src.html)
        .pipe(rigger())
        .pipe(gulp.dest(path.build.html))
        .pipe(reload({stream: true}));
});

// Build javascript
gulp.task('js:build', function () {
    gulp.src(path.src.js)
        .pipe(plumber())
        .pipe(rigger())
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.js))
        .pipe(reload({stream: true}));
});

//Build CSS from SCSS
 gulp.task('css:build', function () {
   return sass(path.src.style)
     .pipe(plumber())
     .on('error', sass.logError)
     .pipe(autoprefixer({ browsers: ['last 2 version', 'IE 10']}))
     .pipe(csscomb())
     .pipe(gulp.dest(path.build.style))
     .pipe(rename('style-min.css'))
	 .pipe(csso())
     .pipe(gulp.dest(path.build.style))
     .pipe(reload({stream: true}));
 });

//Polyfills
 gulp.task('polyfills:build', function() {
    gulp.src(path.src.polyfills)
        .pipe(gulp.dest(path.build.polyfills))
});

 //Fonts
 gulp.task('fonts:build', function() {
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts))
});

 //Images
 gulp.task('image:build', function () {
    gulp.src(path.src.img)
        .pipe(imagemin({ 
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest(path.build.img))
        .pipe(reload({stream: true}));
});

 gulp.task('build', [
    'html:build',
    'js:build',
    'polyfills:build',
    'css:build',
    'fonts:build',
    'image:build'
]);

//Watch
 gulp.task('watch', function(){
    gulp.watch([path.watch.html], ['html:build']);
    gulp.watch([path.watch.style], ['css:build']);
    gulp.watch([path.watch.js],['js:build']);
    gulp.watch([path.watch.polyfills],['polyfills:build']);
    gulp.watch([path.watch.img], ['image:build']);
    gulp.watch([path.watch.fonts], ['fonts:build']);
});

 //Delete img
 gulp.task('clean', function (cb) {
    rimraf(path.clean, cb);
});
 
 // Main
 gulp.task('default', ['build', 'webserver', 'watch']);