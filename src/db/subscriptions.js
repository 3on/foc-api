var _ = require('underscore');

var subscriptions = [
	  {
	  	keyWords: ['dexter'],
	  	banWords: ['laboratory'],
	  	quality: ['720p', 'hdtv'],
	  	language: ['english', 'french'] //subtitles ?
	  }
	, {}
];


exports.findAll = function (cb) {
	cb(subscriptions);
}