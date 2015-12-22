var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var QuestionSchema = new Schema({
    question: String,
    answer: String,
    //TODO reference to quiz coll

});

module.exports = mongoose.model('User', QuestionSchema);