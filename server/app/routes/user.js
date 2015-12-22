var express = require('express'),
    app = express(),
    router = express.Router(),
    User = require('../models/user');


router.use(function (req, res, next) {
    console.log('Incoming API request.: User', req.body);
    next();
});

router.route('/')


    .post(function (req, res) {


        console.log("quizID: " + req.body.result.quizID);
        console.log("points: " + req.body.result.points);


        var user = new User();
        //  user.loginname = req.body.loginname;
        user.firstname = req.body.firstname;
        user.lastname = req.body.lastname;
        user.imageurl = req.body.imageurl;
        user.text = req.body.text;
        user.status = req.body.status;
        user.result.push({quizID: req.body.result.quizID, points: req.body.result.points});

user.save(function (err) {
    if (err)
        res.send(err);
    res.json({message: 'User created!'});


});
})


.
get(function (req, res) {
    User.find(function (err, user) {
        if (err) {
            res.send(err);
        }
        res.json(user);
    });
});

router.route('/:userid')


    .get(function (req, res) {
        User.findById(req.params.userid, function (err, user) {

            if (err) {
                res.send(err);
            }

            res.json(user);
        });
    })


    .put(function (req, res) {
        User.findById(req.params.userid, function (err, user) {

            if (err) {
                res.send(err);
            }

            //  user.loginname = req.body.loginname;
            user.firstname = req.body.firstname;
            user.lastname = req.body.lastname;
            user.imageurl = req.body.imageurl;
            user.text = req.body.text;
            user.status = req.body.status;
            user.result = [req.body.quizID, req.body.quizID];

            user.save(function (err) {
                if (err) {
                    res.send(err);
                }
                res.json({message: 'User updated!'});
            });

        });
    })


    .delete(function (req, res) {
        User.remove({
            _id: req.params.userid
        }, function (err, user) {

            if (err) {
                res.send(err);
            }

            res.json({message: 'Successfully deleted'});
        });


    });

module.exports = router;