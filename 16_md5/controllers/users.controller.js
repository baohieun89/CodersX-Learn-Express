var db = require('../db');
var shortid = require('shortid');
var bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports ={
  index: (req, res) => {
    res.render('users/index', {
      users : db.get('users').value()
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
   req.body.wrongLoginCount =0
   var hash = bcrypt.hashSync(req.body.password, saltRounds);
   req.body.password = hash;
   db.get('users').push(req.body).write();
   res.redirect('/users');
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

  delete: (req, res) => {
    var id = req.params.id ;
    db.get('users').remove({ id: id}).write();
    res.redirect('back');
  }


};
