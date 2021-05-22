const URLModel = require('../models/urlModel');
const dns = require('dns');

// Hanlde GET reqs
async function getURL(req, res) {
    const short_url = req.params.short_url;
    let errors;


    await URLModel.findOne({ shortURL: short_url }, (error, urlDoc) => {
        if (error) {
            console.log('Error searching database');
        } else {
            if (urlDoc == null) {
                res.status(404).json('URL not found');
            } else {
                res.redirect(urlDoc.originalURL);
            }
        }
    });
}

// Handle POST reqs
async function postURL(req, res) {
console.log(res.locals.originalURL)
    try {
        const shortURL = createRandomString();
        await URLModel.create({ originalURL: res.locals.originalURL, shortURL });
        res.status(201).json({ original_url: res.locals.originalURL, short_url: shortURL });
    } catch (error) {
        const errors = handleErrors(error);
        res.status(400).json(errors);
    }
}

// Generate random string for short URL
function createRandomString() {
    const randomString = Math.random().toString(16).substr(2, 5);
    return randomString;
}

// Handle any errors
function handleErrors(error) {
    let errorObject = { error: '' };

    if (error.keyPattern.hasOwnProperty('originalURL')) {
        errorObject.error = 'URL has already been shortened';
        return errorObject;
    }

    if (error.keyPattern.hasOwnProperty('shortURL')) {
        errorObject.error = 'shortURL already taken';
        return errorObject;
    }

    else {
        console.log(error);
        return;
    }

}

module.exports = { getURL, postURL };