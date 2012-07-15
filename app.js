var express = require('express');
var db 	= require('./db.js');

var app = express.createServer();

app.get('/', function(req, res){
    res.send('Hello World');
});

app.get('/users/:id', function(req, res){
	db.getUserById(req.params.id, function(data){
		res.json(data);
	});
});

app.listen(8080);