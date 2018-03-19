var net = require('net');
var fs = require('fs');

var server = net.createServer( Meteor.bindEnvironment( function ( socket ) {
//socket.write("Hi welcome to federation");
  socket.addListener( "data", Meteor.bindEnvironment( function ( data ) {
	var val = data.toString('utf8');
	console.log(data.toString('utf8'));
	//var parsing = JSON.parse(val);
	//console.log(parsing);
	//socket.write(data);
	//var doc = JSON.parse(data);
	//console.log(doc);
	var content = fs.writeFileSync('/home/madguy02/Desktop/rclog1.txt', val);
//}); 
    
	//console.log("localhost:8181 : "+ content);
  } ) );
} ) ).listen(6001);
