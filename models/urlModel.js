const mongoose = require('mongoose').Schema;

const URLSchema = new Schema({
    
    originalURL: {
        type: String,
        required: true,
        unique: true
    },
    shortURL : {
        type: String,
        required: true,
        unique: true
    }
});

const URLModel = mongoose.model('url', URLSchema);

module.exports = URLModel;