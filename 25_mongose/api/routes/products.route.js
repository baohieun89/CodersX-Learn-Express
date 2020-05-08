const express = require('express');

var controller = require('../controllers/products.controller')

var router = express.Router();

router.get('/', controller.index);
router.get('/:id',controller.viewProduct)
router.post('/', controller.create);
router.delete('/:id',controller.delete);
router.patch('/:id', controller.update)

module.exports = router;