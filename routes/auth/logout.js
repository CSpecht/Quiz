module.exports = function login( req, res, next ) {
  req.session.destroy( function( error ) {
    if( error ) return next( error )
    res.status( 200 ).end()
  })
}
