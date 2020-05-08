var User = require('../../models/user.model');

module.exports.postLogin = async (req, res, next) => {

	var user = await Product.find(req.body.email);
		res.json(products);

};