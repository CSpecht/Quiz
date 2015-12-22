function validate( user, password, callback ) {
  callback( null, false )
}

module.exports = function login( req, res, next ) {
  next( new Error( 'Not implemented' ) )
}
