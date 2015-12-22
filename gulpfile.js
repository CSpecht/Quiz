var Stream = require( 'stream' )
var gulp = require( 'gulp' )
var plugin = require( 'gulp-load-plugins' )()

gulp.task( 'styles', function() {
  return gulp.src( 'app/styles/main.less' )
    .pipe( plugin.less() )
    .pipe( plugin.autoprefixer({ browsers: [ 'last 1 version' ] }) )
    .pipe( gulp.dest( 'static/styles/' ) )
})

gulp.task( 'images', function() {
  return gulp.src( 'app/images/**/*' )
    .pipe( gulp.dest( 'static/images' ) )
})

gulp.task( 'fonts', function() {

  var bowerFiles = require( 'main-bower-files' )()
    .concat( 'app/fonts/**/*' )
    .concat( 'bower_components/bootstrap/fonts/*' )

  return gulp.src( bowerFiles )
    .pipe( plugin.filter( '**/*.{eot,svg,ttf,woff,woff2}' ) )
    .pipe( plugin.flatten() )
    .pipe( gulp.dest( 'static/fonts' ) )

})

gulp.task( 'html', [ 'styles' ], function() {

  var csspipe = new Stream.PassThrough()
    .pipe( plugin.csso() )
    .pipe( plugin.replace( 'bower_components/bootstrap/fonts', 'fonts' ) )

  return gulp.src( 'app/**/*.html' )
    .pipe( plugin.if( '*.js', plugin.ngAnnotate() ) )
    // .pipe( plugin.if( '*.js', plugin.uglify() ) )
    .pipe( plugin.if( '*.css', csspipe ) )
    .pipe( plugin.useref({
      searchPath: [ 'static' ],
    }) )
    .pipe( gulp.dest( 'static' ) )

})

gulp.task( 'build', [
  'html',
  'images',
  'fonts'
], function() {
  gulp.watch( 'app/styles/**/*.less', [ 'styles' ] )
  gulp.watch( 'app/images/**/*', [ 'images' ] )
  gulp.watch( 'app/**/*.html', [ 'html' ] )
  gulp.watch( 'app/**/*.js', [ 'html' ] )
})

gulp.task( 'default', [ 'build' ], function() {
  // ...
})
