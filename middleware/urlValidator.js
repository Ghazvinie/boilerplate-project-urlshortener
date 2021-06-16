const dns = require('dns');

// Validates URL
function urlValidator(req, res, next) {
    const originalURL = req.body.url;
    // Extract hostname from URL string, dns.lookup() only accepts hostname
    const { hostname } = new URL(originalURL);
    dns.lookup(hostname, (error) => {
        if (error) {
            // Display message if URL invalid
            res.status(400).render('index', { message: 'Invalid URL' });
        } else {
            // Save original URL to locals and call next middleware
            res.locals.originalURL = originalURL;
            next();
        }
    });
}

module.exports = urlValidator;