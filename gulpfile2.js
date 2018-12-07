var gulp = require("gulp");
var less = require("gulp-less")
var postcss = require('gulp-postcss')
var sourcemaps = require('gulp-sourcemaps')
var pxtoviewport = require('postcss-px-to-viewport');
gulp.task("a", function () {
    gulp.src("src/less/a.less")
        .pipe(less())
        .pipe(gulp.dest('src/css'))
})

gulp.task('css', () => {

    var processors = pxtoviewport({
        viewportWidth: 640,
        viewportUnit: 'vw'
    });
    return gulp.src('src/**/*.css')
        .pipe(sourcemaps.init())
        .pipe(postcss([require('precss'), require('autoprefixer'), processors]))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('build/'))
})


gulp.task('default', ['a', 'css'])