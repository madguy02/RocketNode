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

    console.log('cbnbo' + '>' + data.message);
  })
})
//process.stdin.on('data',function(socket){

//});

stdin.addListener("data", function(d) {
streams.forEach(function(socket) {
socket.write({username: me, message: d.toString().trim()})
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
