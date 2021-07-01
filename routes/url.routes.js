const express = require('express');
const router = express.Router();
const controller = require('../controllers/url.controller')

router.post('/swishurl', controller.createShortURL);


module.exports = router;