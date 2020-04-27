const express = require('express');


var bodyParser = require('body-parser');
var controller = require('../controllers/list.controller')
var router = express.Router();
router.use(express.json()) // for parsing application/json
router.use(express.urlencoded({ extended: true }))


router.get("/", controller.index)
router.post('/add', controller.add)
router.get('/edit/:id', controller.edit);
router.post('/edit/:id', controller.postEdit);

router.get('/delete/:id', controller.delete);

module.exports = router;