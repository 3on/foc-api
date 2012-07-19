exports.index = function indexClosure(req, res) {
  res.json( { title: 'Torrents' } );
}

exports.add = function addClosure(req, res) {
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

exports.tr = function trClosure(req, res) {
	console.log('Calling tr method');
	var configPrivate = require('../config_private.js');
	var options =
	{
		uri: configPrivate.tr.uri,
		json: {method: 'torrent-get', arguments: {fields:['files']}}
	};
	var Transmission = require('../lib/Transmission.js');
	var torrent = Transmission.getInstance();
	if (torrent === undefined || torrent === null) {
		torrent = Transmission.getNew();
	}
	
	torrent.rpc(options, function rpcCallback(response, body) {
		return res.json( {status: 'ok', 'tr-response': response});
	});
}