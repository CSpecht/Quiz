var secret = process.env[ 'COOKIE_SECRET' ] ||
  'A secret key to the cookie jar'

module.exports = require( 'cookie-parser' )( secret, {
  maxAge: 30 * 24 * 60 * 60,
  secure: true,
  httpOnly: true,
  firstPartyOnly: true,
})
