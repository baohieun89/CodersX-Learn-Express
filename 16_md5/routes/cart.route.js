const express = require('express');
var controller = require('../controllers/cart.controller')
var router = express.Router();

router.get('/', controller.index);
router.get('/add/:productID', controller.addToCart)
module.exports = router;
