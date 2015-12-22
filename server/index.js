/*var express = require('express'),
 app = express(),
 bodyParser = require('body-parser'),
 cors = require('cors'),
 mongoose = require('mongoose'),
 port = process.env.PORT || 9000;

 mongoose.connect('mongodb://localhost:27018/crud');


 app.use(bodyParser.json());
 app.use(cors());
 app.use('/api/users', require('./app/routes/user'));
 app.listen(port);

 console.log('Magic happens on port ' + port);
 */

'use strict';

/*
 var express = require('express');
 var bodyParser = require('body-parser');
 var auth = require('./app/routes/auth.js');
 var api = require('./app/routes/api.js');
 var morgan = require('morgan'); //logger modul
 var cors = require('cors');
 var mongoose = require('mongoose');


 var app = express();
 mongoose.connect('mongodb://localhost:27018/crud');



 app.set('port', process.env.port || 9000);
 app.use(cors());
 app.use(bodyParser.json());
 app.use('/api/users', require('./app/routes/user'));
 app.use(morgan('dev'));
 app.use(bodyParser.urlencoded({
 extended: true
 }));
 app.post('/auth', auth.login);
 app.use('/api', api);

 // Error Handling
 app.use(function (req, res) {
 res.type('text/plain');
 res.status(404);
 res.send('404 - Not Found');
 });

 app.listen(app.get('port'), function () {
 console.log('Express ready on https://localhost:' + app.get('port'));
 });

 var express = require('express');
 var api = require('./app/routes/api.js');
 var mongoose = require('mongoose');
 var cors = require ('cors');
 var config = require('config');

 var app = express();
 app.set('port', process.env.port || 9000);
 app.use(cors());
 app.use('/api/user', require('./app/routes/user'));




 var db = mongoose.connection;
 db.on('error', console.error);
 db.on('open', function () {
 var kittySchema = mongoose.Schema({
 name: String
 });

 kittySchema.methods.speak = function () {
 var greeting = this.name
 ? "Meow name is " + this.name
 : "I don't have a name";
 console.log(greeting);
 }
 var Kitten = mongoose.model('Kitten', kittySchema);

 var fluffy = new Kitten({ name: 'fluffy'});
 fluffy.speak();

 fluffy.save(function (err, fluffy) {
 if (err) return console.error(err);
 fluffy.speak();
 });

 Kitten.find(function (err, kittens) {
 if(err) return console.error(err);
 console.log(kittens);
 });



 });

 mongoose.connect('mongodb://localhost:27018/quiz');


 app.listen(app.get('port'), function () {
 console.log('Express ready on https://localhost:' + app.get('port'));
 });

 */


var express = require('express'),
    bodyParser = require('body-parser'),
    auth = require('./app/routes/auth.js'),
    cors = require('cors'),
    mongoose = require('mongoose'),
    morgan = require('morgan'),

    app = express();

app.set('port', process.env.port || 9000);
app.use(cors());

mongoose.connect('mongodb://localhost:27018/quiz');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(morgan('dev'));
app.post('/auth', auth.login);
app.post('/logout', auth.logout);

//TODO implement LOGIN
app.use(require('./app/middlewares/validateRequest')); // app.use([require('./app/middlewares/validateRequest')]);
//console.log([require('./app/middlewares/validateRequest')]);

app.use('/api/user', require('./app/routes/user'));
app.use('/api/quiz', require('./app/routes/quiz'));



// Error Handling
app.use(function (req, res) {
    res.type('text/plain');
    res.status(404);
    res.send('404 - Not Found');
});


app.listen(app.get('port'), function () {
 console.log('Express ready on https://localhost:' + app.get('port'));
});
