'use strict';

var gulp = require('gulp'),
concat   = require('gulp-concat'),
uglify   = require('gulp-uglify'),
mainBowerFiles = require('main-bower-files'),
plumber  = require('gulp-plumber');


var paths = [
    'src/js/ileo-overlay/constants/overlay.constant.js',
    'src/js/ileo-overlay/services/overlay.service.js',
    'src/js/ileo-overlay/services/overlayConfig.service.js',
    'src/js/ileo-overlay/components/overlay.component.js',
    'src/js/ileo-overlay/directives/overlayClose.directive.js',
    'src/js/ileo-overlay/directives/overlayOpen.directive.js',
    'src/js/ileo-overlay/directives/overlayToggle.directive.js',
];


gulp.task('build', function() {
    return gulp.src( paths )
        .pipe(plumber())
        .pipe(concat( 'ileo-overlay.min.js' ))
        .pipe(uglify({
            preserveComments: 'license'
        }))
        .pipe(gulp.dest( 'dist' ));
});


gulp.task('vendors', function () {
    return gulp.src(mainBowerFiles())
        .pipe(concat('vendors.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
});


gulp.task('templates', function () {
    return gulp.src('src/**/*.html')
        .pipe(gulp.dest('dist/src'));
});

gulp.task('demo', [ 'build' ] ,function() {
    return gulp.src( 'src/js/pages/demo.controller.js' )
        .pipe(plumber())
        .pipe(concat( 'script.js' ))
        .pipe(gulp.dest( 'dist' ));
});