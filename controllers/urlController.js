const URLModel = require('../models/urlModel');
const handleErrors = require('../utils/handleError');
const createRandomString = require('../utils/randomString');

// Find short URL in database and redirect to original URL
async function getURL(req, res) {
    const short_url = req.params.short_url;
    try {
        // Search database for URL
        await URLModel.findOne({ shortURL: short_url }, (error, urlDoc) => {
            if (error) {
                console.log('Error searching database');
            } else {
                if (urlDoc === null) {
                    res.status(404).render('index', { message: 'URL not found' });
                } else {
                    // Redirect to original URL
                    res.status(302).redirect(urlDoc.originalURL);
                }
            }
        });
    } catch (error) {
        console.log(error);
    }
}

// Handle user submitting a new URL to be shortened
async function postURL(req, res) {
    // Generate the random short string
    const shortURL = createRandomString();
    const originalURL = res.locals.originalURL;

    try {
        // Add URL to database
        const storedURL = await URLModel.create({ originalURL, shortURL });
        if (storedURL) {
            res.status(200).render('shorturl', { originalURL, shortURL, message: 'Your shortened URL!' });
        } else {
            console.log('Error adding URL to database')
        }
    } catch (error) {
        const errors = handleErrors(error);
        // URL has already been shortened, return this to user along with shortened URL
        if (errors.error === 'URL has already been shortened') {
            URLModel.findOne({ originalURL }, (error, doc) => {
                if (error) console.log(error);
                return res.status(200).render('shorturl', { originalURL: doc.originalURL, shortURL: doc.shortURL, message: 'URL has already been shortened!' });
            });
        }
    }
}

module.exports = { getURL, postURL };