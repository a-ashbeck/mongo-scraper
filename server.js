// Dependencies
var express = require('express');
var handlebars = require('express-handlebars');
var mongojs = require('mongojs');
var mongoose = require('mongoose');
var request = require('request');
var cheerio = require('cheerio');
var Story = require('./models/Story.model')

// Initialize Express
var app = express();

// Database configuration
var databaseUrl = 'scraper';
var collections = ['scrapedData'];

// Setup engine for Handlebars
app.engine('handlebars', expressHandlebars({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
// Setup static directory
app.use(express.static(__dirname + '/public'));
// Parse the body
app.use(bodyParser.json());
// Parse application/x-www-form-urlencoded to send those young body elements through the q-string
app.use(bodyParser.urlencoded({ extended: true }));

// Mongoose database connection with Heroku configuration
mongoose.connect('mongodb://heroku_6p4k868n:m8omduel4nqlonrefu044pfh2t@ds157349.mlab.com:57349/heroku_6p4k868n');

// Require routes from controller
require('./controllers/app_controller.js')(app);

// Listen on port 3000
app.listen(3000, function() {
  console.log('App running on port 3000!');
});
