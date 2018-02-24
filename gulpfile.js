const gulp = require('gulp');
const sass = require('gulp-sass');

gulp.task('sass', () => {
     return gulp.src('./client/src/sass/**/*.scss')
                .pipe(sass())
                .pipe(gulp.dest('./client/dist/css'));
});

gulp.task('default', ['sass']);