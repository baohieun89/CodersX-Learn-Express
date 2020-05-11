var mongoose = require('mongoose');

var transactionSchema = new mongoose.Schema({
  userID: String,
  bookID: String,
  isComplete: Boolean
});

var Transaction = mongoose.model('Transaction', transactionSchema, 'transactions');

module.exports = Transaction;
