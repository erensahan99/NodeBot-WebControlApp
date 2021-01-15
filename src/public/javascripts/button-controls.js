
const abc = function (value) {
    socket.emit('movement', {
        id: value.id,
        value: value.value
    });
    // console.log(value.id + ' ' + value.value);
}

flashState = 0;
rgbState = 0;
laserState = 0;
kiskacState = 0;

$(document).keydown(function (e) {
    if (e.which == 37) {
        socket.emit('motor', {
            id: 'sol',
            value: document.getElementById('speed').value
        });
        $('.left').addClass('pressed');
        $('.left').css('transform', 'translate(0, 2px)');
    } else if (e.which == 38) {
        socket.emit('motor', {
            id: 'ileri',
            value: document.getElementById('speed').value
        });
        $('.up').addClass('pressed');
        $('.up').css('transform', 'translate(0, 2px)');
    } else if (e.which == 39) {
        socket.emit('motor', {
            id: 'sag',
            value: document.getElementById('speed').value
        });
        $('.right').addClass('pressed');
        $('.right').css('transform', 'translate(0, 2px)');
    } else if (e.which == 40) {
        socket.emit('motor', {
            id: 'geri',
            value: document.getElementById('speed').value
        });
        $('.down').addClass('pressed');
        $('.down').css('transform', 'translate(0, 2px)');
    }
    else if (e.which == 83) {
        if (flashState == 0) {
            socket.emit('flash', { value: "on" });
            flashState = 1;
        }
        else if (flashState == 1) {
            socket.emit('flash', { value: "off" });
            flashState = 0;
        }
    }
    else if (e.which == 65) {
        if (rgbState == 0) {
            socket.emit('rgb', { value: "on" });
            rgbState = 1;
        }
        else if (rgbState == 1) {
            socket.emit('rgb', { value: "off" });
            rgbState = 0;
        }
    }
    else if (e.which == 68) {
        if (laserState == 0) {
            socket.emit('laser', { value: "on" });
            laserState = 1;
        }
        else if (laserState == 1) {
            socket.emit('laser', { value: "off" });
            laserState = 0;
        }
    }
    else if (e.which == 32) {
        if (kiskacState == 0) {
            socket.emit('kiskac', { value: "on" });
            kiskacState = 1;
        }
        else if (kiskacState == 1) {
            socket.emit('kiskac', { value: "off" });
            kiskacState = 0;
        }
    }
    else if (e.which == 81) {
        socket.emit('kol', { value: "sol" });
    }
    else if (e.which == 87) {
        socket.emit('kol', { value: "ortala" });
    }
    else if (e.which == 69) {
        socket.emit('kol', { value: "sag" });
    }

});

$(document).keyup(function (e) {
    if (e.which == 37) {
        $('.left').removeClass('pressed');
        $('.left').css('transform', 'translate(0, 0)');
        socket.emit('motor', {
            id: 'dur',
            value: 0
        });
    } else if (e.which == 38) {
        $('.up').removeClass('pressed');
        $('.up').css('transform', 'translate(0, 0)');
        socket.emit('motor', {
            id: 'dur',
            value: 0
        });
    } else if (e.which == 39) {
        $('.right').removeClass('pressed');
        $('.right').css('transform', 'translate(0, 0)');
        socket.emit('motor', {
            id: 'dur',
            value: 0
        });
    } else if (e.which == 40) {
        $('.down').removeClass('pressed');
        $('.down').css('transform', 'translate(0, 0)');
        socket.emit('motor', {
            id: 'dur',
            value: 0
        });
    }

});

$('.left').mousedown(function () {
    socket.emit('motor', {
        id: 'sol',
        value: document.getElementById('speed').value
    });
    $('.left').css('transform', 'translate(0, 2px)');
});

$('.left').mouseup(function () {
    socket.emit('motor', {
        id: 'dur',
        value: 0
    });
    $('.left').css('transform', 'translate(0, 0)');
});

$('.right').mousedown(function () {
    socket.emit('motor', {
        id: 'sag',
        value: document.getElementById('speed').value
    });
    $('.right').css('transform', 'translate(0, 2px)');
});

$('.right').mouseup(function () {
    socket.emit('motor', {
        id: 'dur',
        value: 0
    });
    $('.right').css('transform', 'translate(0, 0)');
});

$('.up').mousedown(function () {
    socket.emit('motor', {
        id: 'ileri',
        value: document.getElementById('speed').value
    });
    $('.up').css('transform', 'translate(0, 2px)');
});

$('.up').mouseup(function () {
    socket.emit('motor', 1);
    $('.up').css('transform', 'translate(0, 0)');
});

$('.down').mousedown(function () {
    socket.emit('motor', {
        id: 'geri',
        value: document.getElementById('speed').value
    });
    $('.down').css('transform', 'translate(0, 2px)');
});

$('.down').mouseup(function () {
    socket.emit('motor', 2);
    $('.down').css('transform', 'translate(0, 0)');
});