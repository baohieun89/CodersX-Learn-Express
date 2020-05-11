var md5 = require('md5');
var bcrypt = require('bcrypt');
var User = require('../models/user.model')

var db = require('../db');

var loginCount;


module.exports= {
	login: (req, res) => {
		res.render('auth/login')
	},

	postLogin: async (req, res) => {
		var email = req.body.email;
		var password = req.body.password;
		var user = await User.find({email: email});

		//var user= db.get('users').find({email: email}).value();
		if (user.length === 0) {
			res.render('auth/login',{
				errors : [
				'User does not exists!'
				],
				values: req.body
			});
			return;
		}
		loginCount = user[0]._doc.wrongLoginCount;
		if(user[0]._doc.wrongLoginCount >= 4){
			res.render('auth/login',{
				errors : [
				'You have logged in wrong too many times. Please contact admins to reset >"<'
				],
				values: req.body
			});
			return;
		}
		var checkPassword = bcrypt.compareSync(password, user[0]._doc.password);

		if(checkPassword){
			loginCount = 0
			await User.updateOne(
															{ _id : user[0]._doc._id },
															{wrongLoginCount : loginCount}
			);

			res.cookie('userID', user[0]._doc._id,{signed:true});
			res.redirect('/')
		}else{
			console.log('sai passs')
			loginCount = (loginCount || 0) + 1;
			console.log(loginCount);
			//db.get('users').find({email :email}).assign({wrongLoginCount:loginCount}).write();
			await User.updateOne(
															{ _id : user[0]._doc._id },
															{wrongLoginCount : loginCount}
			);

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
