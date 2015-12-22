var Express = require( 'express' )
var router = new Express.Router()
var debug = require( 'debug' )( 'clicker:app' )

router.post( '/auth', require( './auth/login' ) )
router.post( '/logout', require( './auth/logout' ) )

router.use( '/api', require( './api' ) )

router.post( '/-/', function( req, res ) {
  debug( 'csp violation', req.body )
  res.status( 204 ).end()
})

module.exports = router
