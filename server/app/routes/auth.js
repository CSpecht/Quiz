'use strict';

var jwt = require('jsonwebtoken');
var request = require('request-promise');


function genToken(user) {
    var expires = 84400;
    var token = jwt.sign(user, require('../config/secret.js')(), {
        expiresIn: expires // expires in 24 hours
    });
    return {
        token: token,
        expires: expires,
        user: user
    };
}

function expiresIn(numDays) {
    var dateObj = new Date();
    return dateObj.setDate(dateObj.getDate() + numDays);
}

var auth = {

    login: function (req, res) {

        var username = req.body.username || '';
        var password = req.body.password || '';

        if (username === '' || password === '') {
            res.status(401);
            res.json({
                "status": 401,
                "message": "Invalid credentials"
            });
            return;
        }

        auth.validate(username, password).then(function (response) {

                if (response.statusCode === 204) {
                 var test = res.json(genToken({username: username}));
                    console.log('genTOke');
                    console.log(test);
                    /*
                    todo: anlegen wenn kein user, nicht anlegen wenn bereits in db
                     */

                } else {
                    res.status(500);
                    res.json({
                        "status": 500,
                        "message": "Internal Server Error"
                    });
                }
            }
        ).catch(function (err) {
                if (err.statusCode === 401) {
                    res.status(401);
                    res.json({
                        "status": 401,
                        "message": "Invalid credentials"
                    });
                    return;
                }

                res.status(500);
                res.json({
                    "status": 500,
                    "message": "no connection"
                });
            });
    },

    validate: function (username, password) {
        var payload = {
            user: username,
            password: password
        };
        return request.post({
            url: 'https://mars.iuk.hdm-stuttgart.de/~ck115/login.php',
            formData: payload,
            resolveWithFullResponse: true
        });
    },

    logout: function(req, res) {
        res.status(200);
        res.json({
            "status": 200,
            "message": "logout successfull"
        });
    }
};


module.exports = auth;

