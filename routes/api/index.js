var Express = require( 'express' )
var Router = Express.Router

var router = new Router()

router.use( function( req, res, next ) {
  if( req.session && req.session.user )
    return next()
  console.log("API CALL")
  res.send( 403 ).end()
})

router.use( '/user', require( './user' ) )
router.get( '/quiz', require( './quiz' ))
//router.get( '/question', require( './question' ))

module.exports = router
