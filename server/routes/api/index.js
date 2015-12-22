var Express = require( 'express' )
var Router = Express.Router

var router = new Router()

router.get( '/user', require( './user' ) )
router.get( '/quiz', require( './quiz' ) )

module.exports = router
