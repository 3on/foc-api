// Define the constructor
function Transmission() {

	var self = this;

	this.rpc = function(options, callback) {
		if (self.XTransmissionSessionId) {
			options.headers = {'x-transmission-session-id': self.XTransmissionSessionId};
		}
		var _requestTrCallback =  function(response, body) {
			callback(response, body);
		}
		this._requestTr(options, _requestTrCallback);
	};

	this._requestTr = function(options, _requestTrCallback) {
		var request = require('request');
		
		var postCallback = function(error, response, body) {
			if (response.statusCode === 409) {
				console.log('Error 409. Resetting X-Transmission-Session-Id.');
				self.XTransmissionSessionId = response.headers['x-transmission-session-id'];
				options.headers = {'x-transmission-session-id': self.XTransmissionSessionId};
				return self._requestTr(options, _requestTrCallback);
			} else if (response.statusCode != 200) {
				console.log('error (transmission response): '+ response.statusCode)
				console.log(body);
				return;
			}
			_requestTrCallback(response, body);
		};
		request.post(options, postCallback);
	};
};

var instances = {};

Transmission.create = function() {
	return new Transmission();
}

exports.getInstance = function(name) {
	if (!instances[name]) {
		instances[name] = Transmission.create();
	}
	return instances[name];
};