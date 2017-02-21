var mongoose = require('mongoose');
var Schema = mongoose.Schema;

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
