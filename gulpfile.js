var gulp = require('gulp');
var bump = require('gulp-bump');

gulp.task('bump', function () {
    var version = "1.1." + (process.env.TRAVIS_BUILD_NUMBER || "1");
    return gulp.src('./package.json')
        .pipe(bump({ version: version }))
        .pipe(gulp.dest('./'));
});