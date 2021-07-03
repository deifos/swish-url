const express = require('express');
const router = express.Router();
const controller = require('../controllers/url.controller')

router.get('/:shortCode', controller.redirectUrl);

module.exports = router;