'use strict';

var jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    if (req.method === 'OPTIONS') {
        next();
    }

    var token = req.headers['x-access-token'];
    if (token) {
        jwt.verify(token, require('../config/secret.js')(), function (err, decoded) {
            if (err) {
                res.status(401);
                return res.json({success: false, message: 'Failed to authenticate token.'});
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });
    }
};
