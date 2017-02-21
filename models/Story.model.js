var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var StorySchema = new Schema({
    title: {
        type: String,
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
        ref: 'Comments'
    }]
});
 
module.exports = mongoose.model('Story', StorySchema);
