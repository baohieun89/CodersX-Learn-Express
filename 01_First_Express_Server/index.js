const express = require('express');
const app = express();
const port = 3000;
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
var bodyParser = require('body-parser');
const adapter = new FileSync('db.json');
const db = low(adapter);
app.set('views', './views');
app.set('view engine', 'pug');

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


// Set some defaults (required if your JSON file is empty)
db.defaults({ users: [] })
  .write();

// var users = [
//   {id: 1, name: 'Thinh'},
//   {id: 2, name: 'Hieu'},
//   {id: 3, name: 'huong'},
//   {id: 4, name: 'bao anh'}

// ];

app.get('/', function (request, response) {
	response.render('index',
    {name: 'Hieu CodersX'});
})

// app.get('/', (req, res) => {
//   res.render('users/index', {
//     users : users
//   });
// });
app.get('/users', (req, res) => {
  res.render('users/index', {
    users : db.get('users').value()
  });
});
app.get('/users/search', (req, res) => {
  var q = req.query.q;
  var matchedUsers = db.get('users').value().filter(user => {
    return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
  });

  res.render('users/index',{
    users: matchedUsers
  });
  // console.log(req.query);
  // console.log(matchedUsers);
});


app.get('/users/create', (req,res) => {
  res.render('users/create');
});

app.post('/users/create', (req, res) => {
 console.log(req.body);
 db.get('users').push(req.body).write();
 res.redirect('/users');
});
app.listen(port, function () {
	console.log('Server listening on port ' + port);
});
