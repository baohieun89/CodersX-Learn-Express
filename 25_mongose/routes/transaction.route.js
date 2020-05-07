const express = require('express');

var bodyParser = require('body-parser');

var router = express.Router();
var controller = require('../controllers/transactions.controller')

router.use(express.json()) // for parsing application/json
router.use(express.urlencoded({ extended: true }))

router.get('/', controller.index)

router.get('/create', controller.create);

router.post('/create', controller.postCreate);

router.get('/:id/complete', controller.complete)

module.exports = router;