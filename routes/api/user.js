var Router = require( 'express' ).Router
var User = require( '../../models/user' )
var debug = require( 'debug' )( 'clicker:api:user' )

var user = new Router()

// Get
user.get( '/', function( req, res, next ) {
  debug( 'get', req.session.user )
  User.findOne({ username: req.session.user.username }, function( error, user ) {
    if( error ) return next( error )
    if( !user ) return res.status( 404 ).end()
    res.send( user )
  })
})

// Get <user>
user.get( '/:id', function( req, res, next ) {
  debug( 'get', req.params.id )
  User.findOne({ _id: req.session.user._id }, function( error, user ) {

    if( error ) return next( error )
    if( !user ) return res.status( 404 ).end()

    if( user.hasRole( 'admin' ) || user.hasRole( 'professor' ) ) {
      User.findOne({ _id: req.params.id }, function( error, user ) {
        if( error ) return next( error )
        if( !user ) return res.status( 404 ).end()
        res.send( user )
      })
    } else {
      res.status( 404 ).end()
    }

  })
})

// Update
user.post( '/', function( req, res, next ) {

  debug( 'post', req.body )

  User.findOne({ _id: req.session.user._id }, function( error, user ) {

    if( error ) return next( error )

    if( user.hasRole( 'admin' ) || user.hasRole( 'professor' ) ) {
      User.findOneAndUpdate({
        _id: req.params.id
      }, req.body, function( error, result ) {
        if( error ) return next( error )
        res.status( 200 )
        res.send( result )
      })
    } else {
      res.status( 403 ).end()
    }

  })

})

// Create
user.put( '/', function( req, res, next ) {

  debug( 'put', req.body )

  User.findOne({ _id: req.session.user._id }, function( error, user ) {

    if( error ) return next( error )

    if( user.hasRole( 'admin' ) || user.hasRole( 'professor' ) ) {

      var newUser = new User({
        username: req.body.username,
        firstName: req.body.firstname || '',
        lastName: req.body.lastname || '',
        roles: req.body.roles || [],
      })

      newUser.save( function( error ) {
        if( error ) return next( error )
        res.status( 201 )
        res.send( newUser )
      })

    } else {
      res.status( 403 ).end()
    }

  })

})

// Delete
user.delete( '/:id', function( req, res, next ) {

  debug( 'delete', req.params )

  User.findOne({ _id: req.session.user._id }, function( error, user ) {

    if( error ) return next( error )

    if( user.hasRole( 'admin' ) || user.hasRole( 'professor' ) ) {

      User.remove({ _id: req.params.id }, function( error, result ) {
        if( error ) return next( error )
        res.status( 200 )
        res.send( result )
      })

    } else {
      res.status( 403 ).end()
    }

  })

})

module.exports = user
