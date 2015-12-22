var request = require( 'request' )
var debug = require( 'debug' )( 'clicker:auth:login' )

module.exports = function login( req, res, next ) {

  var r = request.post({
    url: 'https://mars.iuk.hdm-stuttgart.de/~ck115/login.php',
    formData: {
      user: req.body.username || '',
      password: req.body.password || '',
    },
  }, function( error, httpResponse, body ) {

    debug( httpResponse.statusCode, body )

    if( error ) {
      res.status( 403 )
      res.send({
        code: httpResponse.statusCode,
        message: httpResponse.statusText
      })
      return
    }

    res.status( httpResponse.statusCode )
    res.end()

  })

}
