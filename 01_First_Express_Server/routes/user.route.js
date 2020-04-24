const express = require('express');
var db = require('../db');
var shortid = require('shortid');

var router = express.Router();

router.get('/', (req, res) => {
  res.render('users/index', {
    users : db.get('users').value()
  });
});
router.get('/search', (req, res) => {
  var q = req.query.q;
  var matchedUsers = db.get('users').value().filter(user => {
    return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
  });

  res.render('users/index',{
    users: matchedUsers
  });
  // console.log(req.query);
  // console.log(matchedUsers);
});


router.get('/create', (req,res) => {
  res.render('users/create');
});

router.post('/create', (req, res) => {
 console.log(req.body);
 req.body.id = shortid.generate();
 db.get('users').push(req.body).write();
 res.redirect('/');
});

router.get('/:id', (req, res) =>{
  var id = req.params.id ;
  var user = db.get('users').find({ id: id }).value();
  res.render('users/view',{
    user: user
  });
});
router.get('/edit/:id', (req, res) =>{
  var id = req.params.id;
  var user = db.get('users').find({ id : id }).value();
  res.render('users/edit', {
    user: user
  })
});
router.post('/edit/:id', (req, res) =>{
  var id = req.params.id;
  db.get('users').find({id: id}).assign({name: req.body.name}).write()
  console.log(req.body);
  res.redirect('/')
});
router.get('/:id/delete', (req, res) => {
  var id = req.params.id ;
  db.get('users').remove({ id: id}).write();
  res.redirect('back');
});

module.exports = router;