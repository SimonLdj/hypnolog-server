console.log("start");

var mainOutput = $('#output');

function initialize(){
    mainOutput.find('time').html('Last Update: never');
}
initialize();


function connect(){
    // creating a new websocket
    var socket = io.connect('http://localhost:7000');

    // on every message received we print the new data inside the #container div
    socket.on('notification', function (data) {
        console.log("new data from socket: " + data);

        // convert the json string into a valid javascript object
        //var _data = JSON.parse(data);

        //$('#container').html(_data.test.sample);
        addData(data);
    });

};
connect();

// add data to the DOM
function addData(data){

    mainOutput.find('#content').append("<br>" + data);
    mainOutput.find('time').html('Last Update:' + new Date());
}
