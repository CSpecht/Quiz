var mongoose = require( 'mongoose' )
var session = require( 'express-session' )
var SessionStore = require( 'connect-mongo' )( session )

module.exports = session({
  name: 'session',
  unset: 'destroy',
  secret: 'jesus loves no one',
  resave: false,
  rolling: true,
  saveUninitialized: false,
  store: new SessionStore({
    ttl: 14 * 24 * 60 * 60,
    mongooseConnection: mongoose.connection,
  }),
})
