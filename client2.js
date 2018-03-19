var net = require('net');
var http = require('http');
var fs = require('fs');

var client = new net.Socket();
client.connect(6001, '127.0.0.1', function() {
console.log('connected');

//client.write('{"name": "manish", "age": "934", "channel": "general", "serverName": "myServer", "msg": "Say hello"}');
var bodyString = JSON.stringify({'Sender': 'localhost:3000','serverName': 'my.domain1', 'msg': 'for KKKK'});
console.log("You:"+bodyString);

var headers = {
    'Content-Type': 'application/json',
    'Content-Length': bodyString.length
};

var options = {
host: 'localhost',
path: '/channel/general',
port: 5001,
method: 'PUT',
headers: headers
};

var callback = function(response) {
var str = 'localhost';

response.on('data', function(chunk) {
str += chunk;
});
//console.log(str);
//the whole response has been recieved, so we just print it out here
//response.on('end', function() {
//console.log(str);
//});
};

http.request(options, callback).write(bodyString);
var content = fs.readFileSync('/home/madguy02/Desktop/rclog1.txt');
console.log("Him: "+content.toString("utf8"));
});

//});

client.on('data', function(data) {
console.log(data.toString('utf8'));
//console.log(JSON.parse(data).name);
//console.log(JSON.parse(data).serverName);
//console.log(JSON.parse(data).msg);

//client.write('{"name": "manish", "age": "934", "channel": "general", "serverName": "myServer", "msg": "Say hello"}');

});
