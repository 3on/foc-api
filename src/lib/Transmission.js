// Define the constructor
function Transmission() {
  this.public = 'public';
  var private = 'private';
  this.XTransmissionSessionId = null;
  var self = this;

  this.fonctionpublique = function() {
  	return lol;
  }
};

var instances = {};

Transmission.create = function() {
	return new Transmission();
}

Transmission.prototype.rpc = function(options, callback) {
	if (this.XTransmissionSessionId) {
		options.headers = {'x-transmission-session-id': XTransmissionSessionId};
	}
	var _requestTrCallback =  function(response, body) {
		callback(response, body);
	}
	this._requestTr(options, _requestTrCallback);
};

Transmission.prototype._requestTr =	function(options, _requestTrCallback) {
	var request = require('request');
	var self = this;
	var postCallback = function(error, response, body) {
		if (response.statusCode === 409) {
			console.log('Error 409. Resetting X-Transmission-Session-Id.');
			XTransmissionSessionId = response.headers['x-transmission-session-id'];
			options.headers = {'x-transmission-session-id': XTransmissionSessionId};
			return self._requestTr(options, _requestTrCallback);
		} else if (response.statusCode != 200) {
			console.log('error (transmission response): '+ response.statusCode)
			console.log(body);
			return;
		}
		console.log(body);
		_requestTrCallback(response, body);
	};
	request.post(options, postCallback);
};

exports.getInstance = function(name) {
	/* Evaluates to false:
		false, undefined, null, 0, '', ""
	*/
	if (!instances[name]) {
		instances[name] = Transmission.create();
	}
	return instances[name];
};