var Product = require('../../models/product.model')
var shortid = require('shortid');

module.exports.index = async (req, res, next) => {

	var products = await Product.find();
		res.json(products);

};

module.exports.create = async (req, res, next) => {
	var products = await Product.create(req.body);
	res.json(products);
};
module.exports.viewProduct = async (req, res, next) => {
	var id = req.params.id;
	var product = await Product.find({ _id : id });
	res.json(product);
}
module.exports.delete = async (req, res, next) => {
	var id = req.params.id;
	
	var products = await Product.deleteOne({_id: id});
	res.json(products)
	
}

module.exports.update = async (req, res, next) => {
	var id = req.params.id;
	var doc = req.body;
	var product = await Product.updateOne(
															{ _id : id },
															req.body
	);
	res.json(product);
	
}