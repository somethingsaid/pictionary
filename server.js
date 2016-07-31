var http = require('http');
var express = require('express');
var socket_io = require('socket.io');

var app = express();
app.use(express.static('public'));

var server = http.Server(app);
var io = socket_io(server);


var user = 1;

io.on('connection', function (socket) {
    
    socket.emit('user', user);
    
    user++;
        
    socket.on('draw', function(draw) {
        socket.broadcast.emit('draw', draw);
    });
    
    socket.on('guess', function(guess) {
        socket.broadcast.emit('guess', guess);
    });
 
});

server.listen(8080);
