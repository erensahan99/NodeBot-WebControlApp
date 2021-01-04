
module.exports =  (server) => {
    var socket = require('socket.io');
    var io = socket(server);

    io.sockets.on('connection', (socket) => {
        console.log('New Connection = ' + socket.id);

        socket.on('announcements', function (data) {
            console.log('Got announcement:', data.message);
            socket.broadcast.emit('announcements', data);
            socket.broadcast.emit('setup', data);

        });

        socket.on('setup', function (data) {
            socket.broadcast.emit('setup', data);
        });

        socket.on('arm', function (data) {
            socket.broadcast.emit('arm', data);
        });
        
        socket.on('motor', function (data) {
            socket.broadcast.emit('motor', data);
        });

        socket.on('video', function (data) {
            socket.broadcast.emit('video', data);
        });
    });
}