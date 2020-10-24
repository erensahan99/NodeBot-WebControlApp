
var socket;
socket = io.connect('/')

window.onload = function () {
    socket.on('connect', function () {
        console.log('connected to localhost:8080. id= ' + socket.id);
    });
    socket.emit('announcements', {
        message: 'A new user has joined! ' + socket.id
    });

    socket.on('announcements', function (data) {
        console.log('Got announcement:', data.message);
    });


}
const abc = function(value){
    socket.emit('movement', {
        id: value.id, value: value.value
    });
    console.log(value.id + ' ' + value.value);
}