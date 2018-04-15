var net = require('net');
var http = require('http');
var fs = require('fs');
var stdin = process.openStdin();
var topology = require('fully-connected-topology');
var jsonStream = require('duplex-json-stream');
var data = '';
var streamSet = require('stream-set');
var me = process.argv[2];
var peers = process.argv.slice(3);
var swarm = topology(me,peers);
var streams = streamSet();
var request = require('request');
var express = require('express');



var client = new net.Socket();
client.connect(6001, '127.0.0.1', function() {
console.log('connected');

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
	port: 8181,
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

req.write(JSON.stringify({"username": "dikpaliyasks123456789"/*data.username.replace(":",".")*/, "email":data.email +"@gmail.com", "pass": data.pass, "name": data.name}));
req.end();

var headers = {
	"X-Auth-Token": ""+userId,//"UbPlX5-c15TouXrAPWCBl29vKPLa94TT4iQfi7A0wP2",
	"X-User-Id": ""+token,//"7qETEXRTNf9FvaLwJ",
  "Content-type": "application/json"
};

var join = {
	host: 'localhost',
	port: 8181,
	path: '/api/v1/channels.setJoinCode',
	method: 'GET',
	headers: headers
};

var login = {
host: 'localhost',
	port: 8181,
	path: '/api/v1/login',
	method: 'POST'

}

var createChannel = {
  host: 'localhost',
  port: 8181,
  path: '/api/v1/channels.create',
  method: 'POST',
  headers: headers
}

setTimeout(function(){
var loginreq = http.request(login, function(res) {
  console.log('STATUS: ' + res.statusCode);
  console.log('HEADERS: ' + JSON.stringify(res.headers));
  res.setEncoding('utf8');
  res.on('data', function (chunk) {
    console.log('BODY: ' + chunk);
  });
});

loginreq.write(JSON.stringify({ "username": "dikpaliyasks123456789", "password": "setbalkelahoboaru" }));
loginreq.end();
}, 6000);
setTimeout(function(){
var createChannelreq = http.request(createChannel, function(res){
  // console.log('STATUS: ' + res.statusCode);
  // console.log('HEADERS: ' + JSON.stringify(res.headers));
  res.setEncoding('utf8');
  res.on('data', function (chunk) {
    console.log('BODY: ' + chunk);
  });
});

createChannelreq.write(JSON.stringify({"name": "bihu"}));
createChannelreq.end();
}, 9000);
// var joinreq = http.request(join, function(res) {
//   console.log('STATUS: ' + res.statusCode);
//   console.log('HEADERS: ' + JSON.stringify(res.headers));
//   res.setEncoding('utf8');
//   res.on('data', function (chunk) {
//     console.log('BODY: ' + chunk);
//   });
// });
//
// joinreq.end();


    console.log(data.username + '>' + data.message);
  })
})
//process.stdin.on('data',function(socket){

//});

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
port: 6001,
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
//console.log(str);
//the whole response has been recieved, so we just print it out here
//response.on('end', function() {
//console.log(str);
//});
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
//console.log(JSON.parse(data).name);
//console.log(JSON.parse(data).serverName);
//console.log(JSON.parse(data).msg);

//client.write('{"name": "manish", "age": "934", "channel": "general", "serverName": "myServer", "msg": "Say hello"}');

});

