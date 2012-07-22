exports.index = function(req, res) {
  res.json( { title: 'Torrents' } );
}

exports.add = function(req, res) {
	var id = req.params.id;
	var status = 'ko';
	var added = false;

	if ( id === undefined || id === null || id === '') {
		if ( id === undefined)
			id = 'undefined';
		return res.json( { status:status, added:added, id:id } );
	}
	var status = 'ok';
	var added = true;

  res.json( { status:status, added:added, id:id } );
}

exports.tr = function(req, res) {
	console.log('Calling tr method');
	var configPrivate = require('../config_private.js');
	var options =
	{
		uri: configPrivate.tr.uri,
		json: {method: 'torrent-get', arguments: {fields:['name']}}
	};
	var Transmission = require('../lib/Transmission.js');
	var torrent = Transmission.getInstance('3on');
	
	torrent.rpc(options, function(response, body) {
		console.log(body);
		console.log(response);
		return res.json( {status: 'ok!', trbody: body} );
	});
}