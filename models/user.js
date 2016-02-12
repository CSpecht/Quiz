var mongoose = require( 'mongoose' )
var role = require( 'rolo' )
var Schema = mongoose.Schema

var User = new Schema({
  username: String,
  firstName: String,
  lastName: String,
  passwort: String
})

User.plugin( role )

module.exports = mongoose.model( 'User', User )
