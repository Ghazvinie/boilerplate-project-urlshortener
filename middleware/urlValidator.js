const dns = require('dns');
const { URL } = require('url');

function urlValidator(req, res, next) {
    let parsedURL;

    // Check url can be parsed
    try {
        parsedURL = new URL(req.body.url);
    } catch (error) {
        res.render('index', {message: 'Invalid URL, please try again'});
        return;
    }

    // Check host is valid
    dns.lookup(parsedURL.hostname, (error) => {
        if (error) {
            res.render('index', {message: 'Invalid URL, please try again'});
        } else {
            res.locals.originalURL = req.body.url;
            next();
        }
    });
}

module.exports = urlValidator;