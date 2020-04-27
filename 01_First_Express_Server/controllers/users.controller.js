var db = require('../db');
var shortid = require('shortid');


module.exports.index = (req, res) => {
  res.render('users/index', {
    users : db.get('users').value()
  });
};

module.exports.search = (req, res) => {
  var q = req.query.q;
  var matchedUsers = db.get('users').value().filter(user => {
    return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
  });

  res.render('users/index',{
    users: matchedUsers
  });
};

module.exports.create = (req,res) => {
  console.log(req.cookies['user-id']);
  res.render('users/create');


};

module.exports.view =(req, res) =>{
  var id = req.params.id ;
  var user = db.get('users').find({ id: id }).value();
  console.log(req.cookies);
  res.render('users/view',{
    user: user
  });
};
module.exports.editMode = (req, res) =>{
  var id = req.params.id;
  var user = db.get('users').find({ id : id }).value();
  res.render('users/edit', {
    user: user
  })
}

module.exports.postEdit =  (req, res) =>{
  var id = req.params.id;
  db.get('users').find({id: id}).assign({name: req.body.name}).write()
  console.log(req.body);
  res.redirect('/')
};

module.exports.postCreate =  (req, res) => {
 req.body.id = shortid.generate();
 db.get('users').push(req.body).write();
 res.redirect('/users')
};


module.exports.delete = (req, res) => {
  var id = req.params.id ;
  db.get('users').remove({ id: id}).write();
  res.redirect('back');
};
