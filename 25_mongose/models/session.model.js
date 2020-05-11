var mongoose = require('mongoose');

// var bookCartSchema = new mongoose.Schema({
//  name: Object });

var sessionSchema = new mongoose.Schema({
  id: String,
  bookCart: {}
});
var Session = mongoose.model('Session', sessionSchema, 'session');
module.exports = Session;
