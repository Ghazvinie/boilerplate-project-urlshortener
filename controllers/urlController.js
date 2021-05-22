const URLModel = require('../models/urlModel');
const dns = require('dns');
const { reset } = require('nodemon');

// Handle GET reqs
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
    try {
        const shortURL = createRandomString();
        await URLModel.create({ originalURL: res.locals.originalURL, shortURL });
        res.render('shorturl', { originalURL: res.locals.originalURL, shortURL, message: 'Your shortened URL!' });
    } catch (error) {
        const errors = handleErrors(error);
        if (errors.error === 'URL has already been shortened') {
            URLModel.findOne({ originalURL: res.locals.originalURL }, (error, doc) => {
                if (error) console.log(error);

                return res.render('shortURL', { originalURL: doc.originalURL, shortURL: doc.shortURL, message: 'URL has already been shortened!' })
            });
        }
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