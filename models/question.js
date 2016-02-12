var mongoose = require( 'mongoose' )
var Schema = mongoose.Schema

var Question = new Schema({
  questionText: String,
  time: int,
  points: int,
  answer1: String,
  answer2: String,
  answer3: String,
  answer4: String,
  right: String,
  timestamp: Date,
  Genre [{text: String}]


})

module.exports = mongoose.model( 'question', Question )

/*
Fragen [ {
text: string

Zeit: int
Punkte: int
timestamp
Genre []
Antworten [{4,….}]
}]
*/
