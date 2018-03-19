var net = require('net');
var fs = require('fs');
var http = require('http');
//var MongoClient = require('mongodb').MongoClient;
//var url = "mongodb://localhost:3001/";

var server = net.createServer( Meteor.bindEnvironment( function ( socket ) {
//socket.write("Hi welcome to federation");
  socket.addListener( "data", Meteor.bindEnvironment( function ( data ) {
	var val = data.toString('utf8');
	//var doc = JSON.parse(val);
	console.log(val);
	//socket.pipe(data);
	var content = fs.appendFileSync('/home/madguy02/Desktop/rclog.txt', val);

//});
    //var content = fs.writeFileSync('/home/madguy02/Desktop/rclog.txt', doc.msg);

  } ) )
} ) ).listen(5001);
