// Dependencies
var express = require('express');
var handlebars = require('express-handlebars');
var bodyParser = require('body-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var methodOverride = require('method-override');
var Promise = require('bluebird');
mongoose.Promise = Promise;

// Initialize Express
var app = express();

// Log activity
app.use(logger('dev'));

// Set up body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Setup engine for Handlebars
app.engine('handlebars', handlebars({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Setup static directory
app.use(express.static(__dirname + '/public'));

// Override with POST having ?_method=DELETE
app.use(methodOverride('_method'));

// Database configuration with mongoose
mongoose.connect('mongodb://heroku_hwl3jfjd:dtbj253tsvcs2seet8s86poi0e@ds161059.mlab.com:61059/heroku_hwl3jfjd');
var db = mongoose.connection;

// Show any mongoose errors
db.on('error', function(error) {
  console.log('Mongoose Error: ', error);
});

// Once logged in to the db through mongoose, log a success message
db.once('open', function() {
  console.log('Mongoose connection successful.');
});

// Require routes from controller
require('./controllers/apps_controller.js')(app);

// Listen on port 3000
app.listen(3000, function() {
  console.log('App running on port 3000!');
});
