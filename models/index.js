var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect('mongodb://heroku_6p4k868n:m8omduel4nqlonrefu044pfh2t@ds157349.mlab.com:57349/heroku_6p4k868n');

var StorySchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
        unique: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
    comments: [{
        type: Schema.ObjectId,
        ref: 'Comments'
    }]
});

var CommentSchema = new Schema({
    _story: {
        type: string,
        ref: 'Story',
        required: true
    },
    userID: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});
 
module.exports = mongoose.model('Story', StorySchema);
