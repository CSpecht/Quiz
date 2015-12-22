var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//TODO complete quiz Mongoooseschema
var QuestionSchema = new Schema({questionText: String, points: String, answer1: String, answer2: String, answer3: String, answer4: String,   });




var QuizzSchema = new Schema({
    name: String,
    start: Date,
    creatorID: String,
    questions: [QuestionSchema]
});

module.exports = mongoose.model('Quiz', QuizzSchema);

