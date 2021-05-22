const dns = require('dns');

function urlValidator (req, res, next) {
    const originalURL = req.body.url;
    const trimmedURL = originalURL.trim().toLowerCase().split('//');
    dns.lookup(trimmedURL[trimmedURL.length - 1], (error) => {
        if (error) {
            res.status(400).json({error: 'invalid url'});
        } else {
            res.locals.originalURL = originalURL;
            res.locals.trimmedURL = trimmedURL;
            next();
        }
    });
}

module.exports = urlValidator;