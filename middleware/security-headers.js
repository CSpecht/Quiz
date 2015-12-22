var cspb = require( 'content-security-policy-builder' )
var cspHeader = cspb({
  directives: {
    reportUri: '/-/',
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'"],
    styleSrc: ["'self'", "'unsafe-inline'"],
    connectSrc: ["'self'", 'wss:'],
    childSrc: ["'none'"],
    frameSrc: ["'none'"],
    imgSrc: ["'self'", 'data:'],
    sandbox: ['allow-forms', 'allow-scripts'],
  }
})

module.exports = function( req, res, next ) {

  res.setHeader( 'Content-Security-Policy-Report-Only', cspHeader )
  // res.setHeader( 'Content-Security-Policy', cspHeader )
  res.setHeader( 'X-XSS-Protection', '1; mode=block' )
  res.setHeader( 'X-Frame-Options', 'DENY' )
  res.setHeader( 'X-Download-Options', 'noopen' )
  res.setHeader( 'X-Content-Type-Options', 'nosniff' )
  res.setHeader( 'X-Powered-By', 'electricity' )

  next()

}
