const gulp = require('gulp');
const less = require("gulp-less");
const pxtoviewport = require('postcss-px-to-viewport');

// gulp.task('mini', function(){
//     console.log(1)
// })

gulp.task("default", function () {

    const processors = pxtoviewport({
        viewportWidth: 750,
        viewportUnit: 'vw'
    });
    const postcss = require("gulp-postcss")
    const sourcemaps = require("gulp-sourcemaps")
    const precss = require("precss")
    const autoprefixer = require("autoprefixer")
    gulp.src("src/**/*.less")
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(postcss([precss, autoprefixer, processors, require('postcss-write-svg')()]))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('build/'))
})

// gulp.task("js", function(){

// })

// gulp.task('default', ['css', 'js'])



// npm install gulp-postcss gulp-sourcemaps precss autoprefixer -D

