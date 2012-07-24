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
	var transmission = require('../lib/Transmission.js');
	var torrent = transmission.getInstance('3on');
	
	torrent.rpc(options, function(response, body) {
		return res.json( {status: 'ok!', trbody: body} );
	});
}