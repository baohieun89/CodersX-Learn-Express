var db = require('../db');
var shortid = require('shortid');
var cloudinary = require('cloudinary').v2;
var Book = require('../models/book.model');
var Session = require('../models/session.model');

module.exports = {

  index: async (req, res) => {
    var books = await Book.find();
    res.render('books/index',{
    books: books
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

  addToCart: async (req, res) =>{
    var bookID = req.params.bookID;
    var sessionID = req.signedCookies.sessionID;
    if(!sessionID){
      res.redirect('/books');
      return;
    }
    //var session = await Session.find()
    var session = await Session.find({id: req.signedCookies.sessionID})
    var bookCart = session[0]._doc.bookCart;
    session[0]._doc.bookCart[bookID] = (session[0]._doc.bookCart[bookID] || 0) + 1;

    await Session.updateOne({ id: req.signedCookies.sessionID },session[0]);
    //var update = await Session.updateOne({ id: req.signedCookies.sessionID },{bookCart:{"abcs1321":1}});
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

  cart: async (req, res) =>{
    var session1 = await Session.find({id: req.signedCookies.sessionID})
    res.render('books/cart',{
    books: db.get('books').value(),
    bookCart: db.get('session')
               .find({id : req.signedCookies.sessionID})
               .get('bookCart')
               .value(),
    bookCartMD: session1[0]._doc.bookCart
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
