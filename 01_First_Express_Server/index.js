const express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser')


var userRoute = require('./routes/user.route')

const app = express();
const port = 3000;

app.set('views', './views');
app.set('view engine', 'pug');

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(express.static('public'));
app.use(cookieParser());
app.get('/',cookieCount, function (request, response) {
	response.cookie("CodersX",123);
  response.render('index',
    {name: 'Hieu CodersX'});
})
var count=0;
function cookieCount(req,res,next){
  count++;
  console.log(req.cookies,":",count);
  next();
}
app.use('/',cookieCount);


app.use('/users', userRoute);


app.listen(port, function () {
	console.log('Server listening on port ' + port);
});
