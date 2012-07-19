// Define the constructor
function Transmission() {
  this.public = 'public';
  var private = 'private';
  this.XTransmissionSessionId = null;
  var self = this;
};

Transmission.prototype.rpc = function rpc(options, callback) {
	if (this.XTransmissionSessionId != null) {
		options.headers = {'x-transmission-session-id': XTransmissionSessionId};
	}
	var _private_requestTrCallback =  function rpcCallback(response, body) {
		callback.call(response, body);
	}
	this._private_requestTr(options, _private_requestTrCallback);
};

Transmission.prototype._private_requestTr =
  function _private_requestTrClosure(options, callback) {
	var request = require('request');
	var self = this;
	request.post(options, function (error, response, body) {
		if (response.statusCode === 409) {
			console.log('Error 409. Resetting X-Transmission-Session-Id.');
			XTransmissionSessionId = response.headers['x-transmission-session-id'];
			options.headers = {'x-transmission-session-id': XTransmissionSessionId};
			return self._private_requestTr(options, callback);
		} else if (response.statusCode != 200) {
			console.log('error (transmission response): '+ response.statusCode)
			console.log(body);
			return;
		}
		callback.call(response, body);
	});
};

exports.getNew = function newClosure() {
	this.instance = new Transmission();
	return this.instance;
};

exports.getInstance = function instanceClosure() {
	return this.instance;
};