var db = require('../db');
var shortid = require('shortid');

module.exports= {
	login: (req, res) => {
		res.render('auth/login')
	},

	postLogin: (req, res) => {
		var email = req.body.email;
		var password = req.body.password;
		var user= db.get('users').find({email: email}).value();
		if (!user) {
			res.render('auth/login',{
				errors : [
				'User does not exists!'
				],
				values: req.body
			});
			return;
		}

		if(user.password !== password){
			res.render('auth/login',{
				errors : [
				'Wrong Password'
				],
				values: req.body
			});
			return;
		}
		res.cookie('userID', user.id);
		res.redirect('/users')

	}




}