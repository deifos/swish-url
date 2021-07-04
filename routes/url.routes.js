const express = require('express');
const router = express.Router();
const controller = require('../controllers/url.controller')

router.post('/', controller.createShortURL);
router.get('/popular', controller.getMostPopular5);
router.get('/last5', controller.getLast5);
router.get('/:shortCode', controller.getStats);
router.post('/maintenance', controller.maintenance);

module.exports = router;