var net = require('net');
var fs = require('fs');
var http = require('http');
var Skiff = require('skiff');
var topology = require('fully-connected-topology');
var networkAddress = require('network-address');
var varint = require('varint');
var lpmessage = require('length-prefixed-message');
var jsonStream = require('duplex-json-stream');
var streamSet = require('stream-set');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:3001/meteor";
var stdin = process.openStdin();

var me = 'localhost:6000';
var peers = 'localhost:3003';
var swarm = topology(me,peers);
var streams = streamSet();

// swarm.on('connection', function(socket) {
//   console.log(peers + '[peer joined]');
//   socket = jsonStream(socket);
//   streams.add(socket);
//   socket.on('data',function(data){
//     // console.log('scsh');
//     console.log(data.username + '>' + data.message);
//   })
// })

// stdin.addListener('data',Meteor.bindEnvironment(function(socket){
// streams.forEach(function(socket) {
// socket.write({username: me, message: data.toString().trim()})
// });
// }));




// var t2 = topology('127.0.0.1:4002', ['127.0.0.1:4001', '127.0.0.1:4003']);
//
// t2.on('connection', function(connection, peer) {
//   console.log('t2 is connected to', peer);
// });

var server = net.createServer( Meteor.bindEnvironment( function ( socket ) {
//socket.write("Hi welcome to federation");
  socket.addListener( "data", Meteor.bindEnvironment( function ( data ) {
var val = data.toString('utf8').replace("PUT /channel/general HTTP/1.1","").replace("Content-Type: application/json","")
.replace(/^[0-9]*$/gm,"").replace("Transfer-Encoding: chunked","").replace("Host: localhost:6001","").replace("Connection: close","").replace("2e","").replace(" ","");

	//var doc = JSON.parse(val);
	console.log(val);
	//socket.pipe(data);
	var writerStream = fs.createWriteStream('/home/madguy02/Desktop/rclog1.txt');
	writerStream.write(val,'UTF8');
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
} ) ).listen(6001);

var client = new net.Socket();
client.connect(6001, '127.0.0.1', function() {
console.log('connected this one');

//fs.watchFile('/home/madguy02/Desktop/rclog.txt', function() {
//console.log('updating messages....');
//var file = fs.readFileSync('/home/madguy02/Desktop/rclog1.txt');
//console.log('Message Received: '+ 'at: '+new Date() + file);

//});

swarm.on('connection', function(socket) {
  console.log(peers+'[a peer joined]');
  socket = jsonStream(socket);
  streams.add(socket);
  socket.on('data',function(data){

	var params = {
	host: 'localhost',
	port: 3000,
	path: '/api/v1/users.register',
	method: 'POST'

};
var jsondata;
var parsedjsondata;
var userId;
var token;
var req = http.request(params, function(res) {
  //console.log('STATUS: ' + res.statusCode);
  //console.log('HEADERS: ' + JSON.stringify(res.headers));
  //res.setEncoding('utf8');
  res.on('data', function (chunk) {
     jsondata = chunk.toString('utf8');
     parsedjsondata = (JSON.parse(jsondata));
     console.log(parsedjsondata);
     userId = parsedjsondata.user._id;
    console.log(userId);
     token = parsedjsondata.user.services.email.verificationTokens[0].token;
    console.log(token);
  });
});

req.on('error', function(e) {
  console.log('problem with request: ' + e.message);
});

req.write(JSON.stringify({"username": "testuser010.localhost.3000"/*data.username.replace(":",".")*/, "email":data.email +"@gmail.com", "pass": data.pass, "name": data.name}));
req.end();


var login = {
host: 'localhost',
	port: 3000,
	path: '/api/v1/login',
	method: 'POST'
};

var jsondata1;
var parsedjsondata1;
var userId1;
var token1;
setTimeout(function() {
var loginreq = http.request(login, function(res) {
  res.on('data', function (chunk) {
   jsondata1 = chunk.toString('utf8');
  parsedjsondata1 = (JSON.parse(jsondata1));
  console.log(parsedjsondata1);
  userId1 = parsedjsondata1.data.userId;
 console.log(userId1);
  token1 = parsedjsondata1.data.authToken;
 console.log(token1);
  });
});

loginreq.write(JSON.stringify({ "username": "testuser010.localhost.3000", "password": "natikudancu0123" }));
loginreq.end();
}, 6000);

setTimeout(function(){
var newheaders = {
  "X-Auth-Token": ""+token1,
  "X-User-Id": ""+userId1,
  "Content-type":"application/json"
}
console.log(newheaders);

var sendMessage = {
  host: 'localhost',
  port: 3000,
  path: '/api/v1/chat.postMessage',
  method: 'POST',
  headers: newheaders
}

var sendMessagereq = http.request(sendMessage, function(res){
  res.setEncoding('utf8');
  res.on('data', function (chunk) {
    console.log('BODY: ' + chunk);
  });
});

sendMessagereq.write(JSON.stringify({"channel": "#general", "text": "This is a test for federation!"}));
sendMessagereq.end();
}, 9000);
    console.log(data.username + '>' + data.message);
  })
})

//console.log("Send your info to be added to server: ");
//stdin.addListener("data", function(info) {
//streams.forEach(function(socket) {
//socket.write({user: "localhost:1002", email: info.toString().trim(), pass: info.toString().trim(), name: "homie"})
//});

console.log("Send a message: ");
stdin.addListener("data", function(d) {
streams.forEach(function(socket) {
socket.write({username: me, message: d.toString().trim(), email: d.toString().trim(), pass: d.toString().trim(), name: "homie" });
});

console.log("you entered:"  +d.toString("utf8"));
var bodyString = JSON.stringify({username: me, message: d.toString().trim()}) ;
console.log("You:"+bodyString);


var headers = {
    'Content-Type': 'application/json'
};

var options = {
host: 'localhost',
path: '/channel/general',
port: 3000,
method: 'PUT',
headers: headers
};

var callback = function(response) {
var str = 'localhost';

response.on('data', function(chunk) {
str += chunk;
});

response.removeHeader('Content-Type');
response.removeHeader('Host');
response.removeHeader('Connection');

};

http.request(options, callback).write(bodyString);


});

});
//setTimeout(function(){
//fs.readFile('/home/madguy02/Desktop/rclog1.txt','utf-8',function(err,content){
//console.log(content);
//});
//var readerStream = fs.createReadStream('/home/madguy02/Desktop/rclog1.txt');
//readerStream.setEncoding('utf8');
//readerStream.on('data', function(chunk) {
   //data += chunk;
//});
//console.log(data);
//},2000);

//});

client.on('data', function(data) {
console.log(data.toString('utf8'));
//client.write('{"name": "manish", "age": "934", "channel": "general", "serverName": "myServer", "msg": "Say hello"}');

});

