
module.exports = (server) => {
    var socket = require('socket.io');
    var io = socket(server);

    io.sockets.on('connection', (socket) => {
        socket.on('announcements', function (data) {
            console.log('Got announcement:', data.message);
            socket.broadcast.emit('announcements', data);
            socket.broadcast.emit('setup', data);
        });

        socket.on('setup', function (data) {
            socket.broadcast.emit('setup', data);
        });

        socket.on('motor', function (data) {
            socket.broadcast.emit('motor', data);
        });

        socket.on('video', function (data) {
            socket.broadcast.emit('video', data);
        });

        socket.on('conState', function (data) {
            socket.broadcast.emit('conState', data);
        });

        socket.on('flash', function (data) {
            socket.broadcast.emit('flash', data);
        });

        socket.on('rgb', function (data) {
            socket.broadcast.emit('rgb', data);
        });
        
        socket.on('laser', function (data) {
            socket.broadcast.emit('laser', data);
        });
        
        socket.on('kiskac', function (data) {
            socket.broadcast.emit('kiskac', data);
        });

        socket.on('kol', function (data) {
            socket.broadcast.emit('kol', data);
        });
    });
}