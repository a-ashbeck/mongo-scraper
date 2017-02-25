// Require dependencies
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define Article schema
var ArticleSchema = new Schema({
    title: {
        type: String,
        trim: true,
        required: true,
    },
    link: {
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
        ref: 'Comment'
    }]
});
 
 // Export the model
module.exports = mongoose.model('Article', ArticleSchema);
