var net = require('net');
var fs = require('fs');
var http = require('http');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:8182/meteor";

var server = net.createServer( Meteor.bindEnvironment( function ( socket ) {
//socket.write("Hi welcome to federation");
  socket.addListener( "data", Meteor.bindEnvironment( function ( data ) {
	var val = data.toString('utf8').replace("PUT /channel/general HTTP/1.1","").replace("Content-Type: application/json","")
			.replace("Content-Length: 40","").replace("Host: localhost:5001","").replace("Connection: close","")
			.replace(" ","");
	//var doc = JSON.parse(val);
	console.log(val);
	//socket.pipe(data);
	var content = fs.appendFileSync('/home/madguy02/Desktop/rclog.txt', val);
	MongoClient.connect(url, function(err, db) {
  	if (err) throw err;
  	var dbo = db.db("meteor");
  	var myobj = JSON.parse(val);
	console.log(myobj);
  	dbo.collection("rocketchat_federationmessage").insert(myobj, function(err, res) {
    	if (err) throw err;
    	console.log("1 document inserted");
    	db.close();
  });
}); 

//});
    //var content = fs.writeFileSync('/home/madguy02/Desktop/rclog.txt', doc.msg);

  } ) )
} ) ).listen(5001);
