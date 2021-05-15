const mongoose = require('mongoose');

var articleSchema = new mongoose.Schema({
    Title: {
        type: String,
        required: 'This field is required.'
    },
    CreatedBy: {
        type: String,
        required: 'This field is required.'
    },
    Description: {
        type: String
    }
});



mongoose.model('Article', articleSchema);