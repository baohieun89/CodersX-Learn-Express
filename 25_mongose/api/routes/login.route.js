const express = require('express');

var controller = require('../controllers/login.controller')

var router = express.Router();

router.post('/', controller.postLogin);

module.exports = router;