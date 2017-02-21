var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect('mongodb://heroku_6p4k868n:m8omduel4nqlonrefu044pfh2t@ds157349.mlab.com:57349/heroku_6p4k868n');

var story = new Schema({
    title: String,
    url: String,
    timestamp: {
        type: Date,
        default: Date.now
    },
    comments: [{
        usedId: String,
        body: String,
        timestamp: {
            type: Date,
            default: Date.now
        }
    }]
});
 
module.exports = mongoose.model('story', story);