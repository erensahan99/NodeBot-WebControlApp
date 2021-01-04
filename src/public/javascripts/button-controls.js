
const abc = function (value) {
    socket.emit('movement', {
        id: value.id,
        value: value.value
    });
    // console.log(value.id + ' ' + value.value);
}


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
    } else if (e.which == 66) {
        $('.b').text('B');
    } else if (e.which == 65) {
        $('.a').text('A');
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
    } else if (e.which == 66) {

    } else if (e.which == 65) {
        
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