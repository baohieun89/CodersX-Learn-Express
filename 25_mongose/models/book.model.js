var mongoose = require('mongoose');

var bookSchema = new mongoose.Schema({
  title: String,
  desc: String
});


var Book = mongoose.model('Book', bookSchema, 'books');

module.exports = Book;
