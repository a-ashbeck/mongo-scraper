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

// Hook mongojs configuration to the db variable
var db = mongojs(databaseUrl, collections);
db.on('err', function(err) {
  console.log('Database Error:', err);
});

// Main route, displays all stories
app.get('/', function(req, res) {
  Story.find({})
    .exec(err, stories) {
      if (err) {
        console.log(err);
        res.send('Error in retrieving stroes!');
      } else {
        console.log(stories);
        res.json(stories);
      }
    }
});

// Retrieve data from the db
app.get('/all', function(req, res) {
  // Find all results from the scrapedData collection in the db
  db.scrapedData.find({}, function(err, found) {
    // Throw any errors to the console
    if (err) {
      console.log(err);
    }
    // If there are no errors, send the data to the browser as a json
    else {
      res.json(found);
    }
  });
});

// Scrape data from one site and place it into the mongodb db
app.get('/', function(req, res) {
  // Make a request for the news section of ycombinator
  request('https://news.ycombinator.com/', function(e, response, html) {
    // Load the html body from request into cheerio
    var $ = cheerio.load(html);
    // For each element with a 'title' class
    $('.title').each(function(i, element) {
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

// Listen on port 3000
app.listen(3000, function() {
  console.log('App running on port 3000!');
});
