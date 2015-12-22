var gulp = require('gulp');
var gulpDevelopServer = require('gulp-develop-server');

// run server
gulp.task( 'server:start', function() {
    gulpDevelopServer.listen( { path: './server.js' } );
});

// restart server if app.js changed
gulp.task( 'server:restart', function() {
    gulp.watch( [ './server.js' ], gulpDevelopServer.restart );
});

gulp.task('default', ['server:start'], function() {
    gulp.watch( [ './server.js', './app/**/*.js' ], gulpDevelopServer.restart );
});