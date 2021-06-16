const router = require('express').Router();
const { getURL, postURL } = require('../controllers/urlController');
const urlValidator = require('../middleware/urlValidator');

router.get('/shorturl/:short_url', getURL);

router.post('/shorturl', urlValidator, postURL);

module.exports = router;