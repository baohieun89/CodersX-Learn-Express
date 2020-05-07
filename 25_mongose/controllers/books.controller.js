var db = require('../db');
var shortid = require('shortid');
var cloudinary = require('cloudinary').v2;

module.exports = {

  index: (req, res) => {
    res.render('books/index',{
    books: db.get('books').value()
    });
  },

  add: (req, res) =>{
    res.render('books/add',{
      book: db.get('books').value()

    });
   
  },

  postAdd: (req, res) =>{
    req.body.id = shortid.generate();
    cloudinary.uploader.upload(req.file.path, { tags: 'basic_sample' }, function (err, image) {
      console.log("** File Upload");
      if (err) { console.warn(err); }
      console.log("URL " + image.url);
      req.body.coverUrl = image.url;
      db.get('books').push(req.body).write();

    });
    
    res.redirect('/books')
  },

  addToCart: (req, res) =>{
    var bookID = req.params.bookID;
    var sessionID = req.signedCookies.sessionID;
    if(!sessionID){
      res.redirect('/books');
      return;
    }
    db.get('session')
    .find({ id : sessionID })
    .set('bookCart.' + bookID, 1)
    .write();
    res.redirect('/books');
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
  },

  cart: (req, res) =>{
    res.render('books/cart',{
    books: db.get('books').value(),
    bookCart: db.get('session')
               .find({id : req.signedCookies.sessionID})
               .get('bookCart')
               .value()
    })
  },

  lend: (req, res) =>{
      var bookCart= db.get('session')
               .find({id : req.signedCookies.sessionID})
               .get('bookCart')
               .value();
      var userID = req.signedCookies.userID;
      for (var key in bookCart) {
        db.get("transactions")
          .push({
            bookID: key,
            userID: userID,
            id: shortid.generate(),
            isComplete: false
            })
          .write();
        db.get('session')
               .find({id : req.signedCookies.sessionID})
               .unset('bookCart.'+key)
               .write();
      }
      res.redirect('/books');

  }
}
