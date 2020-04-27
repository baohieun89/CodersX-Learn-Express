var db = require('../db');
var shortid = require('shortid');

module.exports = {
  
  index: (req, res) => {
    res.render('list',{
    books: db.get('books').value()
    });
  },
  
  add: (req, res) =>{
    req.body.id = shortid.generate();
    db.get('books').push(req.body).write();
    res.redirect('back')
  },
  
  edit: (req, res) =>{
    var id = req.params.id;
    var book = db.get('books').find({ id : id }).value();
    res.render('edit', {
      book: book
    })
  },
  
  postEdit: (req, res) =>{
    var id = req.params.id;
    db.get('books').find({id: id}).assign({title: req.body.title}).write()
    res.redirect('/')
  },
  
  delete: (req, res) =>{
    var id = req.params.id;
    db.get('books').remove({ id: id }).write();
    res.redirect('back');
  }
}