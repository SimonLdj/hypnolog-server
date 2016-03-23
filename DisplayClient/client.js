console.log("start");
$('#container').html("start");

// creating a new websocket
var socket = io.connect('http://localhost:7000');

// on every message received we print the new data inside the #container div
socket.on('notification', function (data) {
    console.log("new data from socket: " + data);

    // convert the json string into a valid javascript object
    //var _data = JSON.parse(data);

    //$('#container').html(_data.test.sample);
    $('#container').html("data: " + data);
    $('time').html('Last Update:' + new Date());
});

