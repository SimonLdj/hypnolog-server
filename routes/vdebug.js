var express = require('express');
var router = express.Router();

function sendDataToDisplayClients(data){

    if (displayClients.length == 0)
        console.log("no displayClients (no open sockets)");

    // send all display clients the data
    for (var i in displayClients) {
        var b = displayClients[i];
        console.log('sending data to browser');
        b.volatile.emit('notification', data);
    }
}

router.get('/status', function(req, res){
	//res.send("string");
	res.writeHead(200);
    res.end("200");
});

router.post('/in', function(req, res, next) {
        console.log('* incoming data *');

        // TODO: Do not assume received data is JSON
        // now we assume data sent with 'Content-Type': 'application/json'
        // and then body-parser pars the data to an Object.
        // This behavior fails when received data is string ('Content-Type': 'text')

        sendDataToDisplayClients(req.body);

        res.writeHead(200);
        res.end("200");

        return;
});

module.exports = router;

