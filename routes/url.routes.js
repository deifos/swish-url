const express = require('express');
const router = express.Router();
const controller = require('../controllers/url.controller')

router.post('/', controller.createShortURL);
router.get('/popular', controller.getMostPopular5);
router.get('/:shortCode', controller.getStats);
router.get('/', controller.getLast5);
router.post('/maintenance', controller.maintenance);

module.exports = router;