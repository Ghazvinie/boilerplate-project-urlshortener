const URLModel = require('../models/urlModel');
const handleErrors = require('../utils/handleError');
const createRandomString = require('../utils/randomString');

// Handles 
async function getURL(req, res) {
    const short_url = req.params.short_url;

    try {
        await URLModel.findOne({ shortURL: short_url }, (error, urlDoc) => {
            if (error) {
                console.log('Error searching database');
            } else {
                if (urlDoc === null) {
                    res.status(404).json('URL not found');
                } else {
                    res.status(302).redirect(urlDoc.originalURL);
                }
            }
        });
    } catch (error) {
        console.log(error);
    }
}

// Handle POST reqs
async function postURL(req, res) {
    const shortURL = createRandomString();
    const originalURL = res.locals.originalURL;
    
    try {
        await URLModel.create({ originalURL, shortURL });
        res.status(200).render('shorturl', { originalURL, shortURL, message: 'Your shortened URL!' });
    } catch (error) {
        const errors = handleErrors(error);
        if (errors.error === 'URL has already been shortened') {
            URLModel.findOne({ originalURL }, (error, doc) => {
                if (error) console.log(error);
                return res.status(200).render('shorturl', { originalURL: doc.originalURL, shortURL: doc.shortURL, message: 'URL has already been shortened!' });
            });
        }
    }
}

module.exports = { getURL, postURL };