const express = require('express');

var bodyParser = require('body-parser');

var router = express.Router();
var controller = require('../controllers/transactions.controller')


router.get('/', controller.index)


module.exports = router;
