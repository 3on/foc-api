exports.getUserById = function(id, callback) {
	// query with id and then call the callback
	var queryResult = {login: 'John Doe', pass: 'toto'};
	console.log("-> getUserById with id="+id);
	callback(queryResult);
};