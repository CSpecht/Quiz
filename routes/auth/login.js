var request = require( 'request' )
var debug = require( 'debug' )( 'clicker:auth:login' )

module.exports = function login( req, res, next ) {

  debug( 'request', req.body )

  request.post({
    url: 'https://mars.iuk.hdm-stuttgart.de/~ck115/login.php',
    resolveWithFullResponse: true,
    form: {
      user: req.body.user || '',
      password: req.body.password || '',
    },
  }, function( error, httpResponse, body ) {

    if( error ) {
      res.status( 403 )
      res.send({ message: error.message })
      return
    }

    debug( httpResponse.statusCode, body )

    res.status( httpResponse.statusCode )
    res.end()

  })

}
