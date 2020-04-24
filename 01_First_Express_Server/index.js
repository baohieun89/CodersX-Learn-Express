const express = require('express');
var bodyParser = require('body-parser');

var userRoute = require('./routes/user.route')

const app = express();
const port = 3000;

app.set('views', './views');
app.set('view engine', 'pug');

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


app.get('/', function (request, response) {
	response.render('index',
    {name: 'Hieu CodersX'});
})

// app.get('/', (req, res) => {
//   res.render('users/index', {
//     users : users
//   });
// });

app.use('/users', userRoute);


app.listen(port, function () {
	console.log('Server listening on port ' + port);
});
