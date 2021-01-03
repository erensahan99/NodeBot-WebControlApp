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
        // console.log(data);

        document.getElementById(data.id).value = data.value
    });

    socket.on('spot', function (data) {
        // console.log(data);

        document.getElementById(data.id).value = data.value
    });

}
const abc = function (value) {
    socket.emit('movement', {
        id: value.id,
        value: value.value
    });
    // console.log(value.id + ' ' + value.value);
}

const xyz = function (value) {
    socket.emit('spot', {
        id: value.id,
        value: value.value
    });
    // console.log(value.id + ' ' + value.value);
}

const msgerForm = $(".msger-inputarea");
const msgerInput = $(".msger-input");
const images = [
    'https://image.shutterstock.com/image-vector/vector-lol-guy-meme-face-600w-480482086.jpg',
    'https://image.shutterstock.com/image-vector/vector-lol-happy-guy-meme-600w-482678911.jpg',
    'https://image.shutterstock.com/image-vector/vector-why-guy-meme-face-600w-495629377.jpg',
    'https://image.shutterstock.com/image-vector/vector-cartoon-face-isolated-eps-600w-459355273.jpg',
    'https://image.shutterstock.com/image-vector/vector-guy-meme-why-face-600w-483295684.jpg',
    'https://image.shutterstock.com/image-illustration/troll-face-600w-92637217.jpg',
    'https://image.shutterstock.com/image-vector/funny-cartoon-monster-girl-face-600w-1483525085.jpg',
    'https://image.shutterstock.com/image-illustration/happy-cartoon-monster-face-smiling-600w-1769299049.jpg',
    'https://i.pinimg.com/564x/32/3f/d8/323fd8b794e9c1ab4f52de7e6b018852.jpg',
    'https://i.pinimg.com/originals/5f/39/ce/5f39ce686cff7feed1b3968e06f70183.jpg',
    'https://www.pngitem.com/pimgs/m/165-1657319_troll-faces-png-download-troll-face-transparent-png.png',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRFzunju4oTTqYRUJwVSkuyy6aaMfTh3ZOsUA&usqp=CAU'
]
var name = socket.id;


const randomImg = function () {
    return images[Math.floor(Math.random() * images.length)];
}

const PERSON_IMG = randomImg();

function saveName() {
    if ($('#name').val()) {
        name = $('#name').val();
        $('#name').remove();
        $('#nameInput').remove();

        $('#nameSaver').hide()
        $('#msger').show()

    }
}

function appendMessage(name, img, text) {
    //   Simple solution for small apps
    const msgHTML = `
    <div class="msg left-msg">
      <div class="msg-img" style="background-image: url(${img})"></div>

      <div class="msg-bubble">
        <div class="msg-info">
          <div class="msg-info-name">${name}</div>
          <div class="msg-info-time">${formatDate(new Date())}</div>
        </div>

        <div class="msg-text">${text}</div>
      </div>
    </div>
  `;

    $('.msger-chat').append(msgHTML);
    $('#msg').val('');
    $('.msger-chat').scrollTop += 500;
}

function addappendMessage() {
    if(name=='undefined'){
        $('#name').css('background-color','lightpink');
        return;
    }
    if($('#msg').val()==''){
        return;
    }
    //   Simple solution for small apps
    const msgHTML = `
      <div class="msg right-msg">
        <dcollege degreeiv class="msg-img" style="background-image: url(${PERSON_IMG})"></div>
  
        <div class="msg-bubble">
          <div class="msg-info">
            <div class="msg-info-name">${name}</div>
            <div class="msg-info-time">${formatDate(new Date())}</div>
          </div>
  
          <div class="msg-text">${document.getElementById('msg').value}</div>
        </div>
      </div>
    `;

    socket.emit('message', {
        name: name,
        img: PERSON_IMG,
        text: $('#msg').val()
    })
    $('#msg').val('');
    $('.msger-chat').append(msgHTML);
    $('.msger-chat').scrollTop += 500;

}

function formatDate(date) {
    const h = "0" + date.getHours();
    const m = "0" + date.getMinutes();

    return `${h.slice(-2)}:${m.slice(-2)}`;
}

socket.on('message', function (data) {
    appendMessage(data.name, data.img, data.text);
});
