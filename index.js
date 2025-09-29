var express = require('express');
var socket = require('socket.io');

var app = express();
var server = app.listen(4000, "0.0.0.0", function() {
    console.log('Servidor corriendo en http://3.16.155.187:4000');
});

app.use(express.static('public'));

var io = socket(server);

io.on('connection', function(socket){
    console.log('Hay una conexion', socket.id);

    socket.on('chat', function(data){
        console.log(data);
        io.sockets.emit('chat', data);
    });

    socket.on('typing', function(data){
        socket.broadcast.emit('typing', data);
    });
});