var net = require('net');
var http = require('http');
var fs = require('fs');
var stdin = process.openStdin();

var data = ' ';
var client = new net.Socket();
client.connect(5001, '127.0.0.1', function() {
console.log('connected');

fs.watchFile('/home/madguy02/Desktop/rclog.txt', function() {
console.log('updating messages....');
var file = fs.readFileSync('/home/madguy02/Desktop/rclog.txt');
console.log('Message Received: '+ 'at: '+new Date() + file);

});

stdin.addListener("data", function(d) {
    console.log("you entered:"  +d.toString("utf8"));
  

var bodyString = d;
console.log("You: "+bodyString);
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

//var content = fs.readFileSync('/home/madguy02/Desktop/rclog.txt');
//console.log("Him:  "+ content.toString('utf8'));
});
});

//setTimeout(function(){
//var readerStream = fs.createReadStream('/home/madguy02/Desktop/rclog.txt');
//readerStream.setEncoding('utf8');
//readerStream.on('data', function(chunk) {
   //data += chunk;
//console.log("Received: "+ data);
//});
//},5000);


client.on('data', function(data) {
//client.write(data);
console.log(data.toString('utf8'));
//console.log(JSON.parse(data).name);
//console.log(JSON.parse(data).serverName);
//console.log(JSON.parse(data).msg);

//client.write('{"name": "manish", "age": "934", "channel": "general", "serverName": "myServer", "msg": "Say hello"}');

});


