var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
	name: String,
	email: String,
	password: String,
	avatar: String,
	age: String,
	wrongLoginCount: Number,
	isAdmin: Boolean
});

var User = mongoose.model('User', userSchema, 'users');

module.exports = User;