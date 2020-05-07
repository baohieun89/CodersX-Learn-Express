// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
require('dotenv').config()
console.log(process.env.SESSION_SECRET)
const express = require('express');
const app = express();

var mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_LOCAL_URL);
var bodyParser = require('body-parser');
var shortid = require('shortid');
var cookieParser = require('cookie-parser')
const port = 3000;

var booksRoute = require('./routes/books.route');
var userRoute = require('./routes/user.route');
var transRoute = require('./routes/transaction.route')
var productsRoute = require('./routes/products.route')
var authRoute = require('./routes/auth.route')
var cartRoute = require('./routes/cart.route')

var authMiddle = require('./middlewares/auth.middleware')
var sessionMiddle = require('./middlewares/session.middleware')



app.use(express.static('public'));
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(sessionMiddle);
app.set('view engine', 'pug');
app.set('views', './views');
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded



// https://expressjs.com/en/starter/basic-routing.html
app.get('/',authMiddle.requireAuth,cookieCount, (request, response) => {
  response.cookie("CodersX",123);
  response.render('index');
  // console.log('locals: ' +  response.locals)
});
var countCookie=0;
function cookieCount(req,res,next){
  countCookie++;
  console.log(req.cookies,":",countCookie);
  next();
}
app.use('/auth', authRoute);
app.use('/books',authMiddle.requireAuth, booksRoute);
app.use('/products',authMiddle.requireAuth, productsRoute);
app.use('/users',authMiddle.requireAuth, userRoute);
app.use('/transactions',authMiddle.requireAuth, transRoute);
app.use('/cart', cartRoute);
// listen for requests :)
app.listen(port, () => {
  console.log("Server listening on port " + port);
});
