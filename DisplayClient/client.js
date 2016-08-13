console.log("start");

var mainOutput = $('#output');
var mainContent = $('#output').find('#content');

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

    mainOutput.find('time').html('Last Update:' + new Date());

    try {
        data = JSON.parse(data);
    }
    catch (ex){
        console.log("couldn't parse data: " + data);
    }

    var htmlData = JSON.stringify(data,null,"\t");
    mainContent.append("<pre>" + htmlData + "</pre>");

    if (data.type === "array"){
        var gData = convertArrayToGraph(data.array);
        displayGraph(gData,
                     ( data.name && data.name.length) > 0 ? data.name : "Unnamed");
    }
}

function displayGraph(data, title){

    var newElement = $('<div>')[0];
    mainContent.append(newElement);
    MG.data_graphic({
        title: title,
        data: data,
        width: 650,
        height: 350,
        target: newElement,
        x_accessor: 'key',
        y_accessor: 'value',
    })
}

function displayBarGraph(data, title){

    var newElement = $('<div>')[0];
    mainContent.append(newElement);
    MG.data_graphic({
        title: title,
        data: data,
        width: 650,
        height: 350,
        target: newElement,
        x_accessor: 'key',
        y_accessor: 'value',
        chart_type: 'bar',
        //bar_orientation: 'vertical',
    })
}

function displayHistogram(data){

    var newElement = $('<div>')[0];
    mainContent.append(newElement);
    MG.data_graphic({
        title: "Histogram",
        data: data,
        width: 650,
        height: 350,
        target: newElement,
        x_accessor: 'key',
        y_accessor: 'value',
        chart_type: 'histogram',
        //bar_margin: 0,
        bins: data.length,
        //right: 10,
    })
}


function convertArrayToGraph(arr){

    var d = [];
    for (var i = 0; i < arr.length; i++){
        d.push({"key" : i, "value" : arr[i]});
    }

    return d;
}

