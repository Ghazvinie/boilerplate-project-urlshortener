const router = require('express').Router();
const urlController = require('../controllers/urlController');

router.get('/shorturl', urlController.getURL);

router.post('/shorturl', urlController.postURL);

module.exports = router;