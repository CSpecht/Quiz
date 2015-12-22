var Express = require( 'express' )
var http = require( 'http' )
var socketio = require( 'socket.io' )
var bodyParser = require( 'body-parser' )
var morgan = require( 'morgan' )
var mongoose = require( 'mongoose' )
var debug = require( 'debug' )( 'clicker:server' )

var app = new Express()
var server = http.createServer( app )
var wss = socketio( server )

// Don't send the `X-Powered-By` header
app.set( 'x-powered-by', false )
// Indent JSON responses
app.set( 'json spaces', 2 )

app.use( morgan() )
app.use( bodyParser.json() )
app.use( bodyParser.urlencoded({
  extended: true,
}) )

// Generic Middleware
app.use( require( './middleware/security-headers' ) )
app.use( require( './middleware/response-time' ) )
app.use( require( './middleware/compression' ) )

// Routes / static files
app.use( require( './routes' ) )
app.use( require( './middleware/static' )( __dirname + '/static', {
  index: [ 'index.html' ]
}) )

// Catch-all
app.all( '*', function( req, res, next ) {
  if( req.method === 'HEAD' ) {
    res.status( 404 ).end()
  } else if( req.method === 'GET' ) {
    res.status( 404 )
    if( !req.is( 'json' ) ) {
      res.send( '404 – Not Found' )
    } else {
      res.send({
        status: 404,
        message: 'Not Found'
      })
    }
  } else {
    res.status( 405 )
    if( !req.is( 'json' ) ) {
      res.send( '405 – Method Not Allowed' )
    } else {
      res.send({
        status: 405,
        message: 'Method Not Allowed'
      })
    }
  }
})

// CSRF error handler
app.use( function handleCSRF( error, req, res, next ) {

  if( error.code !== 'EBADCSRFTOKEN' )
    return next( error )

  debug( 'EBADCSRFTOKEN', error )
  // TODO: Handle CSRF token errors here

  res.status( 403 )
  res.send( '403 - Forbidden' )

})

// Catch-all error handler
app.use( function handleError( error, req, res, next ) {

  debug( error )

  if( res.headersSent ) {
    return next( error )
  }

  res.status( 500 )

  if( !req.is( 'json' ) ) {
    res.send( '500 – Internal Server Error' )
  } else {
    res.send({
      status: 500,
      message: 'Internal Server Error'
    })
  }

})

var host = process.env[ 'HOST' ]
var port = process.env[ 'PORT' ] || 9000

var socketdbg = require( 'debug' )( 'clicker:socket' )

wss.on( 'connection', function( socket ) {
  socket.emit( 'msg', { message: 'Hello, stranger.' } )
})

mongoose.connect( 'mongodb://localhost:27017/quiz' )
mongoose.connection.on( 'error', function( error ) {
  debug( 'mongoose', error.message )
})

server.listen( port, host, function() {
  debug( 'listening on', this.address() )
})
