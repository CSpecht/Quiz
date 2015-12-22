var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ResultSchema = new Schema({ quizID: String, points: String });
var UserSchema = new Schema({
   // loginname: String,
    lastname: String,
    firstname: String,
    text: String,
    imageurl: String,
    status: String,
    result: [ResultSchema]
});


module.exports = mongoose.model('User', UserSchema);