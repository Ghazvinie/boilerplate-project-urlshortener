const mongoose = require('mongoose');

const URLSchema = new mongoose.Schema({
    
    originalURL: {
        type: String,
        required: true,
        unique: [true, 'URL already saved']
    },
    shortURL : {
        type: String,
        required: true,
        unique: [true, 'shortURL already taken']
    }
});

const URLModel = mongoose.model('url', URLSchema);

module.exports = URLModel;