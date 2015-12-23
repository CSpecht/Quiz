var request = require( 'request' )
var debug = require( 'debug' )( 'clicker:auth:login' )
var User = require( '../../models/user' )

module.exports = function login( req, res, next ) {

  debug( 'session', req.session )

  var username = req.body.username || ''
  var password = req.body.password || ''

  var r = request.post({
    url: 'https://mars.iuk.hdm-stuttgart.de/~ck115/login.php',
    formData: {
      user: username || '',
      password: password || '',
    },
  }, function( error, httpResponse, body ) {

    debug( httpResponse.statusCode, body )

    if( error || httpResponse.statusCode >= 400 ) {
      res.status( 403 )
      res.send({
        code: httpResponse.statusCode,
        message: httpResponse.statusText
      })
      return
    }

    debug( 'getUser', username )

    User.find({ username: username }, function( error, result ) {

      if( error ) return next( error )

      if( result.length > 1 ) {
        debug( 'duplicate users found for', username )
      }

      if( !result || !result.length ) {

        debug( 'no such user on record, creating', username )
        // Create user, create session
        var user = new User({
          username: username,
          firstName: '',
          lastName: '',
        })

        user.save( function( error ) {
          if( error ) return next( error )
          req.session.user = user
          req.session.save()
          res.status( 201 ).end()
        })

      } else {
        // Refresh session
        debug( 'user found, session for', username )
        req.session.user = result[0]
        req.session.save( function( error ) {
          if( error ) return next( error )
          res.status( httpResponse.statusCode )
          res.end()
        })
      }

    })

  })

}
