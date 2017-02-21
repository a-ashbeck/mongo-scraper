var Story = require('../models/Story.model.js');
var Comment = require('../models/Comment.model.js');
var cheerio = require('cheerio');
var request = require('request');

// Export app routes
module.exports = function(app) {
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
	        newStory.save(function(err, story) {
	          // If there's an error during this query
	          if (err) {
	            // Log the error
	            console.log(err);
	          }
	          // Otherwise,
	          else {
	            // Log the saved data
	            console.log(story);
	          }
	        });
	      }
	    });
	  });
	  console.log('Scrape Complete');
	});

	// Display all stories
	app.get('/stories', function(req, res) {
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

	app.post('/comments', function(req, res) {
		var newComment = new Comment();

		newComment._story = req.body._id;
		newComment.userId = req.body.userId;
		newComment.body = req.body.text

    Story.findOne({
        _id: comment.storyLink
    }, function(err, story) {
        Comment.save(function(err, comment) {
            story.comments.push(comment);
            story.save(function(err) {
                if (err) {
                    console.log(err);
                }
            });
        });
    });

    response.redirect('/stories');
	});
};