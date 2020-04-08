const express = require('express');
const app = express();
const port = 3000;

app.get('/', function (request, response) {
	response.send('<h1>Hello CodersX</h1>');
})
app.get('/user', function (request, response) {
	response.send('<h3>Users List</h3>');
})
app.get('/license', function (request, response) {
	response.send('License');
})
app.listen(port, function () {
	console.log('Server listening on port ' + port);
});