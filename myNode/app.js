var mysql = require('mysql')
var express = require('express');
var app = express();
var path = require('path');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'testDB'
})

app.set('port', 3000);

app.get(['/get/username/:uniqueID', '/get/uniqueID/'], function(req, res){
	switch( req.params.uniqueID )
	{
  	case '*':
		connection.query( 'SELECT * from userid', function(err, rows){ res.json(rows); });
		break;
	default:
		connection.query( 'SELECT * from userid where uniqueID = \'' + req.params.uniqueID + '\'', function(err, rows){ res.json(rows); });
	}
});
app.get('/post/userid/:username/:password', function(req, res){
	connection.query('INSERT INTO userid VALUES\(\'' + req.params.username + '\',, \''+ req.params.password +'\'\)', function (err, rows, fields) {
  		if (err) throw err;
		res.json(rows);		
	})
});

app.listen(app.get('port'));
console.log('Express server listening on port ' + app.get('port'));
