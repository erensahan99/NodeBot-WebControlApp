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

$(document).keydown(function (e) {
    if (e.which == 37) {
        socket.emit('motor', {
            id: 'sol',
            value: document.getElementById('hiz').value
        });
        $('.left').addClass('pressed');
        $('.lefttext').text('LEFT');
        $('.left').css('transform', 'translate(0, 2px)');
    } else if (e.which == 38) {
        socket.emit('motor', {
            id: 'ileri',
            value: document.getElementById('hiz').value
        });
        $('.up').addClass('pressed');
        $('.uptext').text('UP');
        $('.left').css('transform', 'translate(0, 2px)');
        $('.down').css('transform', 'translate(0, 2px)');
        $('.right').css('transform', 'translate(0, 2px)');
    } else if (e.which == 39) {
        socket.emit('motor', {
            id: 'sag',
            value: document.getElementById('hiz').value
        });
        $('.right').addClass('pressed');
        $('.righttext').text('RIGHT');
        $('.right').css('transform', 'translate(0, 2px)');
    } else if (e.which == 40) {
        socket.emit('motor', {
            id: 'geri',
            value: document.getElementById('hiz').value
        });
        $('.down').addClass('pressed');
        $('.downtext').text('DOWN');
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
        $('.lefttext').text('');
        $('.left').css('transform', 'translate(0, 0)');
        socket.emit('motor', {
            id: 'dur',
            value: 0
        });
    } else if (e.which == 38) {
        $('.up').removeClass('pressed');
        $('.uptext').text('');
        $('.left').css('transform', 'translate(0, 0)');
        $('.down').css('transform', 'translate(0, 0)');
        $('.right').css('transform', 'translate(0, 0)');
        socket.emit('motor', {
            id: 'dur',
            value: 0
        });
    } else if (e.which == 39) {
        $('.right').removeClass('pressed');
        $('.righttext').text('');
        $('.right').css('transform', 'translate(0, 0)');
        socket.emit('motor', {
            id: 'dur',
            value: 0
        });
    } else if (e.which == 40) {
        $('.down').removeClass('pressed');
        $('.downtext').text('');
        $('.down').css('transform', 'translate(0, 0)');
        socket.emit('motor', {
            id: 'dur',
            value: 0
        });
    } else if (e.which == 66) {
        $('.b').text('');
    } else if (e.which == 65) {
        $('.a').text('');
    }
});

$('.left').mousedown(function () {
    socket.emit('motor', {
        id: 'sol',
        value: document.getElementById('hiz').value
    });
    $('.lefttext').text('LEFT');
    $('.left').css('transform', 'translate(0, 2px)');
});

$('.left').mouseup(function () {
    socket.emit('motor', {
        id: 'dur',
        value: 0
    });
    $('.lefttext').text('');
    $('.left').css('transform', 'translate(0, 0)');
});

$('.right').mousedown(function () {
    socket.emit('motor', {
        id: 'sag',
        value: document.getElementById('hiz').value
    });
    $('.righttext').text('RIGHT');
    $('.right').css('transform', 'translate(0, 2px)');
});

$('.right').mouseup(function () {
    socket.emit('motor', {
        id: 'dur',
        value: 0
    });
    $('.righttext').text('');
    $('.right').css('transform', 'translate(0, 0)');
});

$('.up').mousedown(function () {
    socket.emit('motor', {
        id: 'ileri',
        value: document.getElementById('hiz').value
    });
    $('.uptext').text('UP');
    $('.left').css('transform', 'translate(0, 2px)');
    $('.down').css('transform', 'translate(0, 2px)');
    $('.right').css('transform', 'translate(0, 2px)');
});

$('.up').mouseup(function () {
    socket.emit('motor', {
        id: 'dur',
        value: 0
    });
    $('.uptext').text('');
    $('.left').css('transform', 'translate(0, 0)');
    $('.down').css('transform', 'translate(0, 0)');
    $('.right').css('transform', 'translate(0, 0)');
});

$('.down').mousedown(function () {
    socket.emit('motor', {
        id: 'geri',
        value: document.getElementById('hiz').value
    });
    $('.downtext').text('DOWN');
    $('.down').css('transform', 'translate(0, 2px)');
});

$('.down').mouseup(function () {
    socket.emit('motor', {
        id: 'dur',
        value: 0
    });
    $('.downtext').text('');
    $('.down').css('transform', 'translate(0, 0)');
});

/*
 * Konami-JS ~ 
 * :: Now with support for touch events and multiple instances for 
 * :: those situations that call for multiple easter eggs!
 * Code: https://konami-js.googlecode.com/
 * Examples: http://www.snaptortoise.com/konami-js
 * Copyright (c) 2009 George Mandis (georgemandis.com, snaptortoise.com)
 * Version: 1.4.2 (9/2/2013)
 * Licensed under the MIT License (https://opensource.org/licenses/MIT)
 * Tested in: Safari 4+, Google Chrome 4+, Firefox 3+, IE7+, Mobile Safari 2.2.1 and Dolphin Browser
 */

var Konami = function (callback) {
    var konami = {
        addEvent: function (obj, type, fn, ref_obj) {
            if (obj.addEventListener)
                obj.addEventListener(type, fn, false);
            else if (obj.attachEvent) {
                // IE
                obj["e" + type + fn] = fn;
                obj[type + fn] = function () {
                    obj["e" + type + fn](window.event, ref_obj);
                }
                obj.attachEvent("on" + type, obj[type + fn]);
            }
        },
        input: "",
        pattern: "38384040373937396665",
        load: function (link) {
            this.addEvent(document, "keydown", function (e, ref_obj) {
                if (ref_obj) konami = ref_obj; // IE
                konami.input += e ? e.keyCode : event.keyCode;
                if (konami.input.length > konami.pattern.length)
                    konami.input = konami.input.substr((konami.input.length - konami.pattern.length));
                if (konami.input == konami.pattern) {
                    konami.code(link);
                    konami.input = "";
                    e.preventDefault();
                    return false;
                }
            }, this);
            this.iphone.load(link);
        },
        code: function (link) {
            window.location = link
        },
        iphone: {
            start_x: 0,
            start_y: 0,
            stop_x: 0,
            stop_y: 0,
            tap: false,
            capture: false,
            orig_keys: "",
            keys: ["UP", "UP", "DOWN", "DOWN", "LEFT", "RIGHT", "LEFT", "RIGHT", "TAP", "TAP"],
            code: function (link) {
                konami.code(link);
            },
            load: function (link) {
                this.orig_keys = this.keys;
                konami.addEvent(document, "touchmove", function (e) {
                    if (e.touches.length == 1 && konami.iphone.capture == true) {
                        var touch = e.touches[0];
                        konami.iphone.stop_x = touch.pageX;
                        konami.iphone.stop_y = touch.pageY;
                        konami.iphone.tap = false;
                        konami.iphone.capture = false;
                        konami.iphone.check_direction();
                    }
                });
                konami.addEvent(document, "touchend", function (evt) {
                    if (konami.iphone.tap == true) konami.iphone.check_direction(link);
                }, false);
                konami.addEvent(document, "touchstart", function (evt) {
                    konami.iphone.start_x = evt.changedTouches[0].pageX;
                    konami.iphone.start_y = evt.changedTouches[0].pageY;
                    konami.iphone.tap = true;
                    konami.iphone.capture = true;
                });
            },
            check_direction: function (link) {
                x_magnitude = Math.abs(this.start_x - this.stop_x);
                y_magnitude = Math.abs(this.start_y - this.stop_y);
                x = ((this.start_x - this.stop_x) < 0) ? "RIGHT" : "LEFT";
                y = ((this.start_y - this.stop_y) < 0) ? "DOWN" : "UP";
                result = (x_magnitude > y_magnitude) ? x : y;
                result = (this.tap == true) ? "TAP" : result;

                if (result == this.keys[0]) this.keys = this.keys.slice(1, this.keys.length);
                if (this.keys.length == 0) {
                    this.keys = this.orig_keys;
                    this.code(link);
                }
            }
        }
    }

    typeof callback === "string" && konami.load(callback);
    if (typeof callback === "function") {
        konami.code = callback;
        konami.load();
    }

    return konami;
};

var easter_egg = new Konami();
easter_egg.code = function () {
    alert('Colors mode activated (Press A when you close this)!');

    $('.up').css('background', 'orange');
    $('.up').css('border-right', '10px solid #996300');
    $('.up').css('border-bottom', '10px solid #996300');
    $('.up').css('border-left', '10px solid #b37300');
    $('.up').css('border-top', '10px solid #cc8400');
    $('.uptext').css('color', 'orange')
    $('.uptext').css('text-shadow', '0 0 10px orange, 0 0 10px orange, 0 0 10px orange, 0 0 10px orange');

    $('.down').css('background', 'tomato');
    $('.down').css('border-right', '10px solid #e02200');
    $('.down').css('border-bottom', '10px solid #e02200');
    $('.down').css('border-left', '10px solid #f92600');
    $('.down').css('border-top', '10px solid #ff3814');
    $('.downtext').css('color', 'tomato')
    $('.downtext').css('text-shadow', '0 0 10px tomato, 0 0 10px tomato, 0 0 10px tomato, 0 0 10px tomato');

    $('.left').css('background', 'skyblue');
    $('.left').css('border-right', '10px solid #30aadc');
    $('.left').css('border-bottom', '10px solid #30aadc');
    $('.left').css('border-left', '10px solid #45b3e0');
    $('.left').css('border-top', '10px solid #5bbce4');
    $('.lefttext').css('color', 'skyblue')
    $('.lefttext').css('text-shadow', '0 0 10px skyblue, 0 0 10px skyblue, 0 0 10px skyblue, 0 0 10px skyblue');

    $('.right').css('background', 'red');
    $('.right').css('border-right', '10px solid #990000');
    $('.right').css('border-bottom', '10px solid #990000');
    $('.right').css('border-left', '10px solid #b30000');
    $('.right').css('border-top', '10px solid #cc0000');
    $('.righttext').css('color', 'red')
    $('.righttext').css('text-shadow', '0 0 10px red, 0 0 10px red, 0 0 10px red, 0 0 10px red');
}
easter_egg.load();