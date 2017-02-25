// Require dependencies
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define Comment schema
var CommentSchema = new Schema({
    _article: {
        type: String,
        ref: 'Article'
    },
    text: {
        type: String
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

// Export the model
module.exports = mongoose.model('Comment', CommentSchema);
