var User = require('../../models/user.model')
var bcrypt = require('bcrypt');
module.exports.postLogin = async (req, res, next) => {
	var email = req.body.email;
	var password = req.body.password;
	var user = await User.find({email: email});
		
	if (user.length === 0) {
		console.log('exit');
		res.json({error:"User does not exists!"})
	}
	var checkPassword = bcrypt.compareSync(password, user[0]._doc.password);
	// console.log(checkPassword)
	if(!checkPassword){
		res.json({error:"Wrong Password"});
	}
	res.cookie('userID', user[0]._doc._id,{signed:true});

	res.json({1:"Login success"});
};