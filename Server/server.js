var app = require('http').createServer(httpHandler);
var io = require('socket.io').listen(app);
var fs = require('fs');

// creating the server ( localhost:7000 )
app.listen(7000);
console.log('http server listening on localhost:7000');

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

// handle Http requests
function httpHandler(req, res) {
    console.log('server handling request: ' + req.url + ' [' + req.method + ']');

    var method = req.method;
    var url = req.url;

    // handle '/in' POST request
    if (method === 'POST' && url === '/in') {
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
    }
    else {
        res.writeHead(404);
        res.end("404");
        console.log('res: ' + 404);
    }
}

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

