var serveStatic = require( 'serve-static' )
var defaults = {
  index: false,
  fallthrough: true,
  maxAge: 24 * 60 * 60 * 1000,
}

module.exports = function static( path, options ) {
  return serveStatic( path, Object.assign( {}, defaults, options || {} ))
}
