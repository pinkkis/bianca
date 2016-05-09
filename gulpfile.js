'use strict';

const gulp = require('gulp');
const mocha = require('gulp-mocha');

/**
 * NODE_ENV is used by Express also. `development` and `production`
**/
if (typeof process.env.NODE_ENV === 'undefined') {
	console.log('### INFO: NODE_ENV not defined. Setting it to development');
	process.env.NODE_ENV = 'development';
}

gulp.task('default', () => {
	// content
});

gulp.task('test', () => {
	return gulp
			.src('test/**/*.spec.js', { read: false })
			.pipe(mocha({
				require: ['./test/helpers/chai.js']
			}));
});

gulp.task('clean', function() {
	// nothing
});