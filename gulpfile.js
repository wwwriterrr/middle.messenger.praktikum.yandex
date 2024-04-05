import gulp from 'gulp';
import postcss from 'gulp-postcss';

import autoprefixer from 'autoprefixer';
import cssnext from 'cssnext';
import precss from 'precss';

gulp.task('css', function () {
    const processors = [autoprefixer, cssnext, precss];
    return gulp.src('./src/*.css')
        .pipe(postcss(processors))
        .pipe(gulp.dest('./dist'));
});