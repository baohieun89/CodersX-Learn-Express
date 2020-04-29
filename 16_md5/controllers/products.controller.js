var db = require('../db');
var shortid = require('shortid');

module.exports.index = (req, res, next) => {
	var page = parseInt(req.query.page) || 1; 
	var perPage = 8;
	var start = (page -1 ) * perPage;
	var end = page * perPage;
	res.render('products/index',{
		// products: db.get('products').value().slice(start, end)
		products: db.get('products').drop(start).take(perPage).value()

	})
}