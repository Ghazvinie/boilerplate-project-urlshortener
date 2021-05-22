const URLModel = require('../models/urlModel');
const dns = require('dns');

// Hanlde GET reqs
function getURL(req, res) {
    res.send('get');
}

// Hanlde POST reqs
async function postURL(req, res) {
    const originalURL = req.body.url;
    const trimmedURL = originalURL.trim().toLowerCase().split('//');
    let errors;

    // Check if URL is valid
    dns.lookup(trimmedURL[trimmedURL.length - 1], (error) => {
        if (error) {
            errors = handleErrors(error);
            res.json(errors);
            return;
        }
    });

    try {
        const shortURL = createRandomString();
        await URLModel.create({ originalURL, shortURL });
        res.json({ originalURL, shortURL });
    } catch (error) {
        console.log(error);
        errors = handleErrors(error);
        res.json(errors);
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

    if (error.code === 'ENOTFOUND') {
        errorObject.error = 'invalid url';
        return errorObject;
    }

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