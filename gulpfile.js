var gulp = require('gulp');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var sass = require('gulp-sass');
var compass = require('gulp-compass');
var plumber = require('gulp-plumber');
var autoprefixer = require('gulp-autoprefixer');
var wiredep = require('wiredep').stream;
var usemin = require('gulp-usemin');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');
var rev = require('gulp-rev');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var sourcemaps = require('gulp-sourcemaps');


gulp.task('browser-sync', function () {
    browserSync({
        proxy: "http://www.portfolio.dev/"
    });
});

// Sass task, will run when any SCSS files change & BrowserSync
// will auto-update browsers
gulp.task('sass', function () {
    return gulp.src('public/src/scss/*.scss')
        .pipe(plumber({
            errorHandler: function (error) {
                console.log(error.message);
                this.emit('end');
            }}))
        .pipe(sourcemaps.init())
        .pipe(compass({
            css: 'public/dist/css',
            sass: 'public/src/scss',
            image: 'public/images',
            require: ['susy', 'modular-scale']
        }))
        .pipe(autoprefixer({
            browsers: ['last 8 versions'],
            cascade: false
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('public/dist/css/'))
        .pipe(reload({stream: true}));
});


// Default task to be run with `gulp`
gulp.task('default', ['sass', 'browser-sync'], function () {
    gulp.watch("public/src/scss/*.scss", ['sass']);
});

gulp.task('bower', function () {
    gulp.src('resources/bower/src/*.php')
        .pipe(wiredep({
        }))
        .pipe(gulp.dest('resources/bower/dist'));
});


gulp.task('usemin', function () {
    gulp.src('resources/bower/dist/*.php')
        .pipe(usemin({
            css: [minifyCss(), 'concat', rev()],
            js: [uglify(), rev()],
            outputRelativePath: false
        }))
        .pipe(gulp.dest('resources/parts'));
});

// BowerMe
gulp.task('bowerme', ['bower', 'usemin'], function () {

});

// Serve and Build
gulp.task('serveme', ['sass', 'bower', 'usemin', 'javascript', 'browser-sync'], function () {
    gulp.watch("public/src/scss/*.scss", ['sass']);
    gulp.watch("public/src/js/*.js", ['javascript', browserSync.reload]);
    gulp.watch("resources/**/**/*.php", ['sass', browserSync.reload]);
});

var getBundleName = function () {
    //var version = require('./package.json').version;
    //var name = require('./package.json').name;
    //return version + '.' + name + '.' + 'min';
    return 'all'
};

gulp.task('javascript', function () {

    var bundler = browserify({
        entries: ['./public/src/js/main.js'],
        debug: true
    });

    var bundle = function () {
        return bundler
            .bundle()
            .pipe(source(getBundleName() + '.js'))
            .pipe(buffer())
            .pipe(sourcemaps.init({loadMaps: true}))
            // Add transformation tasks to the pipeline here.
            .pipe(uglify())
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest('public/dist/js/'));
    };

    return bundle();
});