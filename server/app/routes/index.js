var express = require('express');
var app = express();
var router = express.Router();

router.get('/', function(req, res) {
   res.json({
       message: 'Welcome to our API'
   });
});

router.post('/', function(req, res) {
    res.json({
        message: 'Welcome to our API',
        content: req.body.content
    });
});

module.exports = router;