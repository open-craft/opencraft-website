// COFFEE

var gulp    = require( 'gulp' ),
	rename  = require( 'gulp-rename' ),
    coffee  = require( 'gulp-coffee' ),

    config = require( '../config' ).coffee;

gulp.task('coffee', function() {
    config.sources.forEach(function(source) {
        gulp.src( source.src )
            .pipe(coffee())
            .pipe( rename({ suffix: '.min' } ))
            .pipe( gulp.dest( config.dest + '/min/' ));
    });
});