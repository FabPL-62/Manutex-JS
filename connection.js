// se incluye el modulo para conectarse a la base de datos
var mysql = require('mysql');

// parametros para conectarse a la base de datos
var connect_params = {
	host     : '127.0.0.1',
  user     : 'root',
  password : '',
  database : 'bdmanutex'
};

// para realizar una query
module.exports.query = function(_input, _callback) {

	// se obtiene la conexion
	var connect = mysql.createConnection(connect_params);

	// se ve que es _input
	var _query = null, _params = null;
	if (typeof _input === "string") _query = _input;
	else if (typeof _input === "object") {

		if (typeof _input[0] !== "undefined") 
			_query = _input[0];

		if (typeof _input[1] === "object") 
			_params = _input[1];
	}

	if (_query !== null) {

		// se reemplazan los parametros si existen
		if (_params !== null) {
			_query = _query.replace(/\:(\w+)/g, function (txt, key) {
		    if (_params.hasOwnProperty(key)) {
		      return _params[key];
		    }
		    return txt;
		  });
		}

		// se realiza la query
		connect.connect();
		var result = connect.query(_query, function(error, results, fields){
			if (error)
				_callback(error,null);
			else
				_callback(null,results);
		});
		connect.end();
	} else {
		_callback("Bad query format: "+JSON.stringify(_input),null);
	}
};