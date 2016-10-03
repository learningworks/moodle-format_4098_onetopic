/*!
 * Gulpfile for LWBoiler
 *
 * $ npm install gulp gulp-sass gulp-autoprefixer gulp-jshint gulp-concat gulp-imagemin gulp-notify gulp-cache --save-dev
 */

// Load plugins
var gulp =          require('gulp'),
    sass =          require('gulp-sass'),
    autoprefixer =  require('gulp-autoprefixer'),
    jshint =        require('gulp-jshint'),
    imagemin =      require('gulp-imagemin'),
    concat =        require('gulp-concat'),
    notify =        require('gulp-notify'),
    cache =         require('gulp-cache');

// Path variables
var path = {
    styles: {
        src:    'src/scss/',
        build:  '',
    },
    scripts: {
        src:    'src/js',
        build:  'javascript',
    },
    images: {
        src:    'src/images',
        build:  'pix',
    }
};

// Styles
gulp.task( 'styles', function() {
    return gulp.src( path.styles.src + '/styles.scss' )
        .pipe( sass() )
        .pipe( autoprefixer('last 2 version') )
        .pipe( gulp.dest(path.styles.build) )
        .pipe( notify({ message: 'Styles task complete', onLast: true }) );
});

// Scripts
gulp.task( 'scripts', function() {
    return gulp.src(path.scripts.src + '/**/*.js')
        .pipe( jshint() )
        .pipe( jshint.reporter('default') )
        .pipe( concat('theme.js'))
        .pipe( gulp.dest(path.scripts.build) )
        .pipe( notify({ message: 'Scripts task complete', onLast: true }) );
});

// Images
gulp.task( 'images', function() {
    return gulp.src( path.images.src + '/**/*')
        .pipe( cache( imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }) ) )
        .pipe( gulp.dest(path.images.build) )
        .pipe( notify({ message: 'Images task complete', onLast: true }) );
});

// Default task
gulp.task( 'default', ['styles', 'scripts', 'images', 'watch'] );

// Watch
gulp.task( 'watch', function() {

    // Watch .scss files
    gulp.watch( path.styles.src + '/**/*.scss', ['styles'] );

    // Watch .js files
    gulp.watch( path.scripts.src + '/**/*.js', ['scripts'] );

    // Watch image files
    gulp.watch( path.images.src + '/**/*', ['images'] );

});