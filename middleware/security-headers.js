module.exports = function( req, res, next ) {

  res.setHeader( 'X-XSS-Protection', '1; mode=block' )
  res.setHeader( 'X-Frame-Options', 'DENY' )
  res.setHeader( 'X-Download-Options', 'noopen' )
  res.setHeader( 'X-Content-Type-Options', 'nosniff' )
  res.setHeader( 'X-Powered-By', 'electricity' )

  next()

}
