var md5 = require('md5');
var bcrypt = require('bcrypt');

var db = require('../db');

var loginCount;


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
		if(user.wrongLoginCount >= 4){
			res.render('auth/login',{
				errors : [
				'You have logged in wrong too many times. Please contact admins to reset >"<'
				],
				values: req.body
			});
			return;
		}
		var checkPassword = bcrypt.compareSync(password, user.password)
		if(checkPassword){
			loginCount = 0
			db.get('users').find({email :email}).assign({wrongLoginCount:0}).write();
			res.cookie('userID', user.id,{signed:true});
			res.redirect('/')
		}else{
			console.log('sai passs')
			loginCount = (loginCount || 0) + 1;
			console.log(loginCount);
			db.get('users').find({email :email}).assign({wrongLoginCount:loginCount}).write();

			res.render('auth/login',{
				errors : [
				'Wrong Password'
				],
				values: req.body
			});
			return;
		}


	}




}
