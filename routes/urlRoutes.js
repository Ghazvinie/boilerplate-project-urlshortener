const router = require('express').Router();
const urlController = require('../controllers/urlController');
const urlValidator = require('../middleware/urlValidator');

router.get('/shorturl/:short_url', urlController.getURL);

router.post('/shorturl', urlValidator, urlController.postURL);

module.exports = router;