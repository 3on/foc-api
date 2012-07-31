var express = require('express');
var auth = require('connect-auth')
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

  app.use(auth([auth.Basic({
    validatePassword : login,
    realm: 'BuZz'
  })]));

  app.use(app.router);
  app.use(express.static(path.join(__dirname + 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

app.get('/routes', routes.__allRoutes);
app.get('/', routes.index.index);
app.get('/subscriptions', routes.subscriptions.all);
app.post('/torrents/tr/:method', authMiddleware, routes.torrents.tr);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});



/*function login(username, password, success, failure) {
    request(authReq(username, hash(password), BOX_ID), function(err, resp, body) {
        if (err) {
            failure(err);
        } else if (body.status == 'OK') {
            success();
        } else {
            failure(body.err);
        }
    });
}*/
function login(username, password, success, failure) {
  console.log("login/username="+username);
  console.log("login/password="+password);
  success();
}

function authMiddleware(req, res, next) {
  req.authenticate(['basic'], function (error, authenticated) {
    if (error) {
        res.send(error, 500);
    } else if (req.isAuthenticated()) {
        next();
    } else if (!!authenticated) { 
        next();
    } else if (authenticated === false) {
        res.send('Access denied', 403);
    } else {
        // Nothing to do...
    }
  });
}