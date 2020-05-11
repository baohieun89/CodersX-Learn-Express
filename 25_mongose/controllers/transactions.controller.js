var db = require('../db');
var shortid = require('shortid');
var Transaction = require('../models/transaction.model');
var User = require('../models/user.model')

module.exports = {

  index: async (req, res) => {
      var transactions = await Transaction.find();
      var user = await User.find({_id: req.signedCookies.userID});
      res.render('trans/index', {
      transactions: transactions,
      user: db.get('users').find({id: req.signedCookies.userID}).value()

    })
  },

  create: (req, res) =>{
    res.render('trans/create', {
      books: db.get('books').value(),
      users: db.get('users').value(),

    })
  },

  postCreate: (req, res) => {
    req.body.id = shortid.generate();
    req.body.isComplete = false;
    db.get("transactions").push(req.body).write();
    res.redirect("/transactions");
  },

  complete: (req, res) => {
    var id = req.params.id;
    var check = db.get('transactions').value().find(item => item.id ===id);
    if(check.id === id){
      db.get('transactions').find({id: id}).assign({isComplete: true}).write();
    }
    res.redirect("/transactions");
  }
}
