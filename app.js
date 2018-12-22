var express = require('express');
var app = express();
var ExpressPeerServer = require('peer').ExpressPeerServer;

app.get('/', function (req, res, next) {
    res.sendFile(__dirname + "/index.html");
});
app.use('/js', express.static(__dirname + '/js'))

// =======

// var server = app.listen(9000);

var options = {
    debug: true
}

var server = require('http').createServer(app);
var peerserver = ExpressPeerServer(server, options);

app.use('/peerjs', peerserver);

server.listen(9000);

// ========