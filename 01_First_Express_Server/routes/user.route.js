const express = require('express');
var controller = require('../controllers/users.controller')
var validate= require('../validate/users.validate')

var router = express.Router();

router.get('/', controller.index);
router.get('/search', controller.search);

router.get('/cookies',(req, res, next) => {
	res.cookie('user-id', 12345);
	res.send('Hello, Cookie');
});
router.get('/create', controller.create);

router.post('/create',validate.postCreate, controller.postCreate);

router.get('/:id', controller.view);

router.get('/edit/:id', controller.editMode);
router.post('/edit/:id', controller.postEdit);
router.get('/:id/delete', controller.delete);

module.exports = router;
