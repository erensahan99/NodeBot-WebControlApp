
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

    socket.on('setup', function (data) {
        document.getElementById("motor0").value = data.servo0
        document.getElementById("motor1").value = data.servo1
        document.getElementById("motor2").value = data.servo2
        document.getElementById("kiskac").value = data.servo3
    });

    socket.on('movement', function (data) {
        console.log(data);

        document.getElementById(data.id).value = data.value
    });

}
const abc = function(value){
    socket.emit('movement', {
        id: value.id, value: value.value
    });
    // console.log(value.id + ' ' + value.value);
}