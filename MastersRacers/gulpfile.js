/// <binding BeforeBuild='default' Clean='clean-styles, clean-vendor-scripts' />
///
// include plug-ins
var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var del = require('del');
var minifyCSS = require('gulp-minify-css');
var copy = require('gulp-copy');
var bower = require('gulp-bower');
var sourcemaps = require('gulp-sourcemaps');
var jshint = require('gulp-jshint');
var debug = require('gulp-debug');

var config = {
    //JavaScript files that will be combined into a jquery bundle
    jquerysrc: [
        'bower_components/jquery/dist/jquery.js',
        'bower_components/jquery-validation/dist/jquery.validate.js',
        'bower_components/jquery-validation-unobtrusive/jquery.validate.unobtrusive.js'
    ],
    jquerybundle: 'build/jquery-bundle.min.js',

    //Angular files that will be combined into an Angular bundle
    angularsrc: [
        'bower_components/angular/angular.js',
        'bower_components/angular-animate/angular-animate.js',
        'bower_components/angular-aria/angular-aria.js',
        'bower_components/angular-messages/angular-messages.js',
        'bower_components/angular-material/angular-material.js',
        'bower_components/angular-ui-router/release/angular-ui-router.js'
    ],
    angularbundle: 'build/angular-bundle.min.js',

    //Modernizr
    modernizrsrc: ['bower_components/modernizr/src/modernizr.js'],
    modernizrbundle: 'build/modernizer.min.js',

    //Application files
    appsrc: ['Scripts/app/module-racerApp.js',
             'Scripts/app/config-racerApp.js',
             'Scripts/app/**/*.js'],
    appbundle: 'build/app-bundle.js',

    //Angular CSS
    angularcss: 'bower_components/angular-material/angular-material.min.css',

    //Application CSS
    appcss: 'Content/Site.css',
    //fontsout: 'Content/dist/fonts',
    cssout: 'Content/dist/css'

}

// Synchronously delete the output script file(s)
gulp.task('clean-vendor-scripts', function () {
    del(['Scripts/build/*.*']).then(paths=>{
                  console.log('Deleted files and folders:\n', paths.join('\n'));
              });
});

//Create a jquery bundled file
gulp.task('jquery-bundle', function () {
    return gulp.src(config.jquerysrc)
     .pipe(sourcemaps.init())
     .pipe(uglify())
     .pipe(concat(config.jquerybundle))
     .pipe(sourcemaps.write(''))
     .pipe(gulp.dest('Scripts'));
});

//Create an angular bundled file
gulp.task('angular-bundle', function () {
    return gulp.src(config.angularsrc)
        //.pipe(debug())
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(concat(config.angularbundle))
        .pipe(sourcemaps.write(''))
        .pipe(gulp.dest('Scripts'));
});

//Create a modernizr bundled file
gulp.task('modernizer', function () {
    return gulp.src(config.modernizrsrc)
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(concat(config.modernizrbundle))
        .pipe(sourcemaps.write(''))
        .pipe(gulp.dest('Scripts'));
});

//Create a bundle file for the application scripts
gulp.task('app-bundle', function () {
    return gulp.src(config.appsrc)
        //.pipe(debug())
        //.pipe(sourcemaps.init())
        //.pipe(uglify())
        .pipe(concat(config.appbundle))
        //.pipe(sourcemaps.write(''))
        .pipe(gulp.dest('Scripts'));
});

gulp.task('jshint', function () {
    return gulp.src(config.appsrc)
        .pipe(jshint())
        .pipe(jshint.reporter("default"))
        .pipe(jshint.reporter("fail"));
});

// Combine and the vendor files from bower into bundles (output to the Scripts folder)
gulp.task('vendor-scripts', ['jquery-bundle', 'angular-bundle', 'app-bundle'], function () {

});

// Synchronously delete the output style files (css / fonts)
gulp.task('clean-styles', function () {
    del([config.cssout]);
});

gulp.task('css', function () {
    return gulp.src([config.angularcss, config.appcss])
     .pipe(concat('app.css'))
     .pipe(gulp.dest(config.cssout))
     .pipe(minifyCSS())
     .pipe(concat('app.min.css'))
     .pipe(gulp.dest(config.cssout));
});

//Restore all bower packages
gulp.task('bower-restore', function () {
    return bower();
});

//Set a default tasks
gulp.task('default', ['bower-restore', 'clean-styles', 'clean-vendor-scripts', 'jshint'], function () {
    gulp.start('vendor-scripts', 'css');
});