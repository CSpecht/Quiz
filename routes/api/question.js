var Router = require( 'express' ).Router
var Question = require( '../../models/question' )

var Question = new Router()

var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0!
var yyyy = today.getFullYear();
var hh = today.getHours();
var min = today.getMinutes();
var ss = today.getSeconds();

if(dd<10) {
    dd='0'+dd
}

if(mm<10) {
    mm='0'+mm
}

today = mm+'/'+dd+'/'+yyyy '|' hh+mm+ss;


// Create

question.put( '/', function( req, res, next ) {

  debug( 'put', req.body )

    if( error ) return next( error )

      var newQuestion = new Question({
        questionText: req.body.question,
        time: req.body.time,
        points: req.body.points,
        answer1: req.body.answer1,
        answer2: req.body.answer2,
        answer3: req.body.answer3,
        answer4: req.body.answer4,
        right: req.body.right,
        timestamp: today;
      })

      newQuestion.save( function( error ) {
        if( error ) return next( error )
        res.status( 201 )
        res.send( newQuestion )
      })

    } else {
      res.status( 403 ).end()
    }

})

module.exports = Question
