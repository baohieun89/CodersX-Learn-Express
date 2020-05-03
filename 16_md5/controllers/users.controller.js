var db = require('../db');
var shortid = require('shortid');
var bcrypt = require('bcrypt');
var cloudinary = require('cloudinary').v2;

const saltRounds = 10;

module.exports ={
	index: (req, res) => {
		var page = parseInt(req.query.page) || 1;
		var perPage = 4;
		var drop = (page -1 ) * perPage;
		var end = page * perPage;
		res.render('users/index', {
			users : db.get('users').drop(drop).take(perPage).value(),
			pages : Math.ceil((db.get('users').value().length)/perPage)
		});
	},

	search: (req, res) => {
		var q = req.query.q;
		var matchedUsers = db.get('users').value().filter(user => {
			return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
		});

		res.render('users/index',{
			users: matchedUsers
		});
	},

	create: (req,res) => {
		res.render('users/create');
	},

	postCreate: (req, res) => {

		req.body.id = shortid.generate();
		var hash = bcrypt.hashSync(req.body.password, saltRounds);
		req.body.password = hash;
		req.body.wrongLoginCount =0;
		//req.body.avatar = req.file.path.split('\\').slice(1).join('/');
		cloudinary.uploader.upload(req.file.path, { tags: 'basic_sample' }, function (err, image) {
			console.log("** File Upload");
			if (err) { console.warn(err); }
			console.log("URL " + image.url);
			req.body.avatar = image.url;
			db.get('users').push(req.body).write();
		});



	 res.redirect('/users');
	 console.log(res.locals);
	},

	profile: (req, res) => {
		var user = db.get('users')
								 .find({id: req.signedCookies.userID})
								 .value();

		res.render('users/profile',{
			user: user
		})
	},

	view: (req, res) =>{
		var id = req.params.id ;
		var user = db.get('users').find({ id: id }).value();
		res.render('users/view',{
			user: user
		});
	},

	edit: (req, res) =>{
		var id = req.params.id;
		var user = db.get('users').find({ id : id }).value();
		res.render('users/edit', {
			user: user
		})
	},

	postEdit: (req, res) =>{
		var id = req.params.id;
		db.get('users').find({id: id}).assign({name: req.body.name}).write()
		console.log(req.body);
		res.redirect('/users')
	},

	postProfile:(req, res) => {
		console.log(req.file.path);
		cloudinary.uploader.upload(req.file.path, { tags: 'basic_sample' }, function (err, image) {
			console.log("** File Upload");
			if (err) { console.warn(err); }

			req.body.avatar = image.url;
			db.get('users').find({id: req.signedCookies.userID})
										 .assign({avatar: image.url})
										 .write()

		});
		res.redirect('/users')
	},

	delete: (req, res) => {
		var id = req.params.id ;
		db.get('users').remove({ id: id}).write();
		res.redirect('back');
	}


};
