exports.index = function(req, res) {
  res.json( { title: 'Torrents' } );
}

/**
	ex:

	*POST*
	/torrents/tr/torrent-get

	*data*
	Content-Type application/json
	{"fields": ["name"]}

*/
exports.tr = function(req, res) {
	sanitize = require('validator').sanitize;
	if (req.params.method) {
		var method = sanitize(req.params.method).xss();
	}
	if (req.body) {
		var arguments = sanitize(req.body).xss();
	}

	console.log('Calling tr method');
	console.log('method=' + method);

	var options =
	{
		uri: require('../config_private.js').tr.uri,
		json: {method: method, arguments: arguments},
		tag: 42
	};
	if (options.uri === 'http://xxx/transmission/rpc') {
		console.log('Error: default URL should be replaced in config_private.js.');
	}
	var transmission = require('../lib/Transmission.js');
	var torrent = transmission.getInstance('3on');
	
	torrent.rpc(options, function(response, body) {
		return res.json( {status: 'ok', trBody: body} );
	});
}