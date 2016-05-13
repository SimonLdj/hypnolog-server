var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require('fs');


 //creating the server ( localhost:7000 )
server.listen(7000, function () {
    console.log('http server listening on localhost:7000');
});

// hold display clients
var displayClients = [];

function sendDataToDisplayClients(data){

    // send all display clients the data
    for (var i in displayClients) {
        var b = displayClients[i];
        console.log('sending data to browser');
        b.volatile.emit('notification', data);
    }

}

app.post('/in', function (req, res) {
        console.log('* incoming data *');

        var data = [];
        req.on('data', function(chunk) {
            data.push(chunk);
        }).on('end', function() {
            data = Buffer.concat(data).toString();
            // at this point, `data` has the entire request data stored in it as a string
            console.log('data: ' + data);
            // send the received data to all our display clients
            sendDataToDisplayClients(data);
        });

        res.writeHead(200);
        res.end("200");

        return;
});

// creating a new websocket to keep the content updated without any AJAX request
io.sockets.on('connection', function(socket) {
  console.log("new socket connection");

  // add it to display client list
  displayClients.push(socket);

  // TODO: send welcome message to new client

  // send the new data to the client
  var data = "00001";
  socket.volatile.emit('notification', data);
});

