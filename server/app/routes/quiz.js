var express = require('express'),
    app = express(),
    router = express.Router(),
    Quiz = require('../models/quiz');


router.use(function (req, res, next) {
    console.log('Incoming API request.: Quiz', req.body);
    next();
});

router.route('/')


    .post(function (req, res) {
        var quiz = new Quiz();

        quiz.question = req.body.question;
        quiz.answer = req.body.answer;
        quiz.points = req.body.points;
        quiz.start = req.body.start;
        quiz.end = req.body.end;
        quiz.createrID = req.body.createrID;
        quiz.loginName = req.body.loginName;

        quiz.save(function (err) {
            if (err)
                res.send(err);
            res.json({message: 'Quiz created!'});
        });
    })


    .get(function (req, res) {
        Quiz.find(function (err, quiz) {
            if (err) {
                res.send(err);
            }
            res.json(quiz);
        });
    });

router.route('/:quizid')


    .get(function (req, res) {
        Quiz.findById(req.params.quizid, function (err, quiz) {

            if (err) {
                res.send(err);
            }

            res.json(quiz);
        });
    })


    .put(function (req, res) {
        Quiz.findById(req.params.quizid, function (err, quiz) {

            if (err) {
                res.send(err);
            }


            quiz.question = req.body.question;
            quiz.answer = req.body.answer;
            quiz.points = req.body.points;
            quiz.start = req.body.start;
            quiz.end = req.body.end;
            quiz.createrID = req.body.createrID;
            quiz.loginName = req.body.loginName;

            quiz.save(function (err) {
                if (err) {
                    res.send(err);
                }
                res.json({message: 'Quiz updated!'});
            });

        });
    })


    .delete(function (req, res) {
        Quiz.remove({
            _id: req.params.quizid
        }, function (err, quiz) {

            if (err) {
                res.send(err);
            }

            res.json({message: 'Quiz Successfully deleted'});
        });


    });

module.exports = router;