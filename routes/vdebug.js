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

router.post('/in', function(req, res, next) {
        console.log('* incoming data *');

        sendDataToDisplayClients(req.body);

        res.writeHead(200);
        res.end("200");

        return;
});

module.exports = router;

