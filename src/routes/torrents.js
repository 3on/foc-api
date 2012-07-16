
exports.index = function(req, res){
  res.json( { title: 'Torrents' } );
};

exports.add = function(req, res){

	var id = req.params.id;
	var status = 'ko';
	var added = false;

	if ( id == undefined || id == null || id == '') {
		if ( id == undefined)
			id = 'undefined';
		return res.json( { status:status, added:added, id:id } );
	}
	var status = 'ok';
	var added = true;

  res.json( { status:status, added:added, id:id } );
};