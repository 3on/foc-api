var db = require('../db/subscriptions');

exports.all = function(req, res){
  db.findAll(function(data){
  	res.json(data)
  });
};