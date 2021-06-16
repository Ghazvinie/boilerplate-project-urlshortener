const dns = require('dns');

function urlValidator(req, res, next) {
    const originalURL = req.body.url;
    const { hostname } = new URL(originalURL);
    dns.lookup(hostname, (error) => {
        if (error) {
            res.status(400).json({ error: 'invalid url' });
        } else {
            res.locals.originalURL = originalURL;
            next();
        }
    });
}

module.exports = urlValidator;