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

// Main route, displays all stories
app.get('/', function(req, res) {
  Story.find({})
    .exec(err, stories) {
      if (err) {
        console.log(err);
        res.send('Error in retrieving stories!');
      } else {
        console.log(stories);
        res.json(stories);
      }
    }
});

// Scrape data from one site and place it into the mongodb
app.get('/', function(req, res) {
  // Make a request for the news section of ycombinator
  request('https://news.ycombinator.com/', function(e, response, html) {
    // Load the html body from request into cheerio
    var $ = cheerio.load(html);
    // For each element with a 'title' class
    $('.title').each(function(i, element) {
      // Define a newStory variable
      var newStory = new Story();

      // Save the text of each link enclosed in the current element
      newStory.title = $(this).children('a').text();
      // Save the href value of each link enclosed in the current element
      newStory.link = $(this).children('a').attr('href');

      // If this title element had both a title and a link
      if (newStory.title && newStory.link) {
        // Save the data in the scrapedData db
        newStory.save(function(err, saved) {
          // If there's an error during this query
          if (err) {
            // Log the error
            console.log(err);
          }
          // Otherwise,
          else {
            // Log the saved data
            console.log(saved);
          }
        });
      }
    });
  });

  // This will send a 'Scrape Complete' message to the browser
  res.send('Scrape Complete');
});

// Mongoose database connection with Heroku configuration
mongoose.connect('mongodb://heroku_6p4k868n:m8omduel4nqlonrefu044pfh2t@ds157349.mlab.com:57349/heroku_6p4k868n');

// Require routes from controller
require('./controllers/app_controller.js')(app);

// Listen on port 3000
app.listen(3000, function() {
  console.log('App running on port 3000!');
});
