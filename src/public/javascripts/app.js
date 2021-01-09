
var state = {
    value: 0,
    set: function (value) {
        this.value = value;
        this.changeState();
    }
}

var dots = 0, dotInterval;
state.changeState = function () {
    if (this.value) {
        clearInterval(dotInterval);
        switch (this.value) {
            case "0":
                $("#live").css("display", "block");
                $("html").css("background-image", "linear-gradient(135deg, #ff5 0%, #00f 100%)");
                $(".state-text").text("");
                $(".control-panel").show();
                break;
            case "1":
                $("html").css("background-image", "url(../images/tv-static.gif)");
                $("#live").css("display", "none");
                $("html").css("  background-size", "auto");
                $("html").css("  background-repead", "round");
                $(".state-text").css("width", "45%");
                $(".state-text").text("Connecting");
                $(".control-panel").hide();
                dot = 0;
                dotInterval = setInterval(() => {
                    dots++;
                    $(".state-text").text($(".state-text").text().concat("."));
                    if (dots == 4) {
                        dots = 0;
                        $(".state-text").text("Connecting");
                    }
                }, 750);
                break;
            case "2":
                $("html").css("background-image", "url(../images/no-signal.gif)");
                $("html").css("background-size", "50%");
                $("#live").css("display", "none");
                $(".state-text").css("width", "60%");
                $(".state-text").text("Connection Failed");
                $(".control-panel").hide();
                break;

            default:
                $(".state-text").text("Error");
                break;
        }
    }
}

window.onresize = function() {
    $("#live").css("height", $("html").width());
    $("#live").css("width", $("html").height());
    
}

window.onload = function () {
    state.set("1");

    socket = io.connect('/');

    socket.on('connect', function () {
        console.log('connected. id= ' + socket.id);
        socket.emit('announcements', {
            message: 'A new user has joined! ' + socket.id
        });
    });

    socket.on('conState', function (data) {
        if (!data.localeCompare("connected")) {
            state.set("0");
        }
        else if (!data.localeCompare("error")) {
            state.set("2");
        }
        else if (!data.localeCompare("disconnected")) {
            state.set("1");
        }
    });

    socket.on('video', function (data) {
        var bytes = new Uint8Array(data);
        var binary = '';
        var len = bytes.byteLength;
        for (var i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i])
        }
        var img = document.getElementById('live');
        img.src = 'data:image/jpg;base64,' + window.btoa(binary);
    });

    socket.on('announcements', function (data) {
        console.log('Got announcement:', data.message);
    });

    socket.on('setup', function (data) {
        document.getElementById("speed").value = data.speed
    });

    socket.on('motor', function (data) {
        console.log(data);
    });

    $("#live").css("height", $("html").width());
    $("#live").css("width", $("html").height()-20);
}