var db = require('../db')
var User = require('../models/user.model')
module.exports.requireAuth = async function (req, res, next) {

	if(!req.signedCookies.userID){
		res.redirect('/auth/login');
		return;
	}

	var user = await User.find({_id: req.signedCookies.userID});
	if(!user.length){
		res.redirect('/auth/login');
		return;
	}

	res.locals.user = user;


	next();
}
