module.exports = require( 'csurf' )({
  ignoreMethods: [ 'GET', 'HEAD', 'OPTIONS' ],
  cookie: true,
})
