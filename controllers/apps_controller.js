var Article = require('../models/Article.model');
var Comment = require('../models/Comment.model');
var cheerio = require('cheerio');
var request = require('request');

// Export app routes
module.exports = function(app) {
		app.get('/', function(req, res) {
			res.render('home');
		});
    // Scrape data from one site and display
    app.get('/index', function(req, res) {
        // Set the articles array for handlebar use
        var articlesArray = [];

        // Make a request for the news section of reddit
        request('https://www.reddit.com/r/news', function(err, res2, html) {
            // Load the html body from request into cheerio
            var $ = cheerio.load(html);

            // For each p element with a 'title' class
            $("p.title").each(function(i, element) {
                // Define a articleObj variable
                var articleObj = {};

                // Save the iterator for ID use on frontend
                articleObj.id = i;
                // Save the text of each link enclosed in the current element
                articleObj.title = $(this).text();
                // Save the href value of each link enclosed in the current element
                articleObj.link = $(this).children().attr("href");

                // Push new article object to articlesArray
                articlesArray.push(articleObj);
            });
            // Render index and send over the object for handlebars to use
            res.render('index', { articles: articlesArray });
        });
    });

    app.post('/articles', function(req, res) {
        var savedArticle = req.body;
        Article.create(savedArticle, function(err, doc) {
            if (err) {
                console.log(err);
                res.redirect('/index');
            } else {
                res.redirect('/index');
            }
        });
    });

    app.get('/articles', function(req, res) {
        // Grab every doc in Articles
        Article.find({})
            // Populate any and all associated comments
            .populate('comments')
            // Execute the callback
            .exec(function(err, articles) {
                if (err) {
                    // If error send error
                    res.send(err);
                } else {
                    // Save each article document into an array
                    var allSavedArticles = articles.map(function(article) {
                        return article;
                    });
                    // Render the array in the articles route for handlebars
                    res.render('articles', { articles: allSavedArticles });
                    console.log(allSavedArticles);
                }
            });
    });

    app.post('/comments', function(req, res) {
        var comment = req.body;
        Article.findOne({
            title: comment.title
        }, function(err, article) {
            Comment.create({
                _article: article._id,
                text: comment.text
            }, function(err, doc) {
            		console.log(doc);
                article.comments.push(doc);
                article.save(function(err) {
                    if (err) {
                        res.send(err);
                    } else {
                        res.redirect('/articles');
                    }
                });
            });
        });
    });

    app.delete('/comments', function(req, res) {
        var commentId = req.body.id;
        Comment.remove({ _id: commentId }, function(err, comment) {
            if (err) {
                res.send(err);
            } else {
                res.redirect('/articles');
            }
        });
    });
};
