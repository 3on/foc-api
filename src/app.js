var express = require('express');
var path = require('path');
var http = require('http');
var fs = require('fs');
var routes = require('./routes.js');

var app = express();

var config = JSON.parse(fs.readFileSync('config.json'));

app.configure(function(){
  app.set('port', process.env.PORT || 8080);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname + 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/routes', routes.__allRoutes);
app.get('/', routes.index.index);
// Subscriptions to tv shows and more
app.get('/subscriptions', routes.subscriptions.all);
app.get('/torrents', routes.torrents.index);
app.get('/torrents/add/', routes.torrents.add);
app.get('/torrents/add/:id', routes.torrents.add);
app.get('/torrents/tr', routes.torrents.tr);


/*var trFactory = require('./tr.js');
var tr = {};
tr.vjeux = trFactory.create('mamasse', 'lolilol');
tr.jr = trFactory.create('jr', 'toto');*/

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});