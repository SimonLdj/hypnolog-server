var mainOutput = $('#output');
var mainContent = document.getElementById("content");
var watchContent = document.getElementById("watchContent");

var allRecivedData = [];

function initialize(){
    mainOutput.find('time').html('Last Update: never');
}
initialize();


function connect(){
    // creating a new websocket
    var socket = io.connect('http://localhost:7000');

    // on every message received we print the new data inside the #container div
    socket.on('notification', function (data) {
        console.log("new data from socket");
        addData(data);
    });

    // TODO: check connection successfully created, log and display to user.

};
connect();

// add data to the DOM
function addData(data){

    // TODO: Expect incoming data not only to be an object, but to be a valid HypnoLog-log object

    // Expect incoming data to be object
    if (typeof data !== "object") {
        console.error("received data is not an Object");
        data = {
            type : "HypnoLog-error",
            error: "HypnoLog error: Data received in display client is not an Object",
            receivedData : data,
        }
    }
    // TODO: push only valid data
    allRecivedData.push(data);

    // update "last update time" in DOM
    mainOutput.find('time').html('Last Update:' + new Date());
    // New session data
    // TODO: do some better design then checking any data type
    if (data.type === "newSession") {
        addNewSession(data.value);
    }
    else if(data.debugOption == "watch"){
        //TODO: check if data.value is a json.
        var attribute = document.createAttribute("id");
        attribute.value = data.name;
        //TODO: parse the data.value.
        htmlData = JSON.stringify(data.value,null,"\t");
        var pre = document.createElement("pre");
        pre.setAttributeNode(attribute);
        pre.innerHTML = htmlData;
        replaceWatchContent(watchContent, pre);
    }
    // Simple Type data
    // TODO: check all simple types in some normal way
    else if (data.type === "String" || data.type === "Int32" || data.type === "Double"){
        var para = document.createElement("p");
        var attribute = document.createAttribute("class");
        attribute.value = "simpleTypeData";
        // TODO: display name (if given) for all types, not only simple
        if (data.name) {
            para.appendChild(creatNameElement(data.name));
        }
        para.appendChild(document.createTextNode(data.value));
        mainContent.appendChild(para);
    }
    // Numbers array data
    else if (data.type === "numbersArray"){
        // TODO: display type for array

        var gData = convertArrayToGraph(data.value);
        displayGraph(gData,
                     ( data.name && data.name.length) > 0 ? data.name : "Unnamed");
        mainContent.appendChild(creatJSONElement(data.value));

    }
    // Object data
    else if (data.type === "object") {
        var typeElement = document.createElement("span");
        var attribute = document.createAttribute("class");
        attribute.value = "variableType";
        typeElement.setAttributeNode(attribute);
        typeElement.innerHTML = data.customType;
        var divAttribute = document.createAttribute("class");
        divAttribute.value = "complexType";
        var div = creatNameElement("div");
        div.setAttributeNode(divAttribute);
        div.appendChild(typeElement);
        // TODO: display name (if given) for all types, not only simple
        if (data.name)
            div.appendChild(creatNameElement(data.name));
        mainContent.appendChild(creatJSONElement(data.value));
    }
    // Other
    else {
        mainContent.appendChild(creatJSONElement(data));
    }
}

function addNewSession(value) {
    var header = document.createElement("h3");
    header.innerHTML = "Section " + value;
    var hr = document.createElement("hr");
    mainContent.appendChild(hr);
    mainContent.appendChild(header);
}

function creatNameElement(name) {
    var nameElement = document.createElement("span");
    var attribute = document.createAttribute("class");
    attribute.value = "variableName";
    nameElement.setAttributeNode(attribute);
    nameElement.innerHTML = name + " :";
    return nameElement;
}

function creatJSONElement(data) {
    var htmlData = JSON.stringify(data, null, "\t");
    var pre = document.createElement("pre");
    pre.innerHTML = htmlData;
    return pre;
}

function replaceWatchContent(element, newData){
    if(element.hasChildNodes()){
        var children = element.childNodes;
        if(children.length > 1){
            for(var i = 0; i < children.length; i++){
                if(children[i].id == newData.id)
                    element.removeChild(element.childNodes[i]);
            }
        }
    }
    else{
        var header = document.createElement("h2");
        header.innerHTML = "Watch Section";
        element.appendChild(header);
    }
    element.appendChild(newData);
}

function displayGraph(data, title){
    var newElement = document.createElement("div");
    mainContent.appendChild(newElement);
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

    var newElement = document.createElement("div");
    mainContent.appendChild(newElement);
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

    var newElement = document.createElement("div");
    mainContent.appendChild(newElement);
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


// -----
// temp

////var t = [1,2,3,4,5,6,7,8,9,10];
//var t = [253,167.0,157.0,178.0,165.0,204.0,181.0,170.0,162.0,134.0,120.0,105.0,116.0,90.0,68.0,46.0,50.0,52.0,42.0,55.0,60.0,61.0,37.0,53.0,61.0,62.0,65.0,87.0,118.0,143.0,189.0,242.0,193.0,163.0,115.0,82.0,73.0,59.0,37.0,27.0,32.0,25.0,13.0,15.0,9.0,12.0,8.0,8.0,6.0,2.0,3.0,7.0,9.0,7.0,6.0,2.0,3.0,5.0,2.0,2.0,2.0,1.0,0.0,4.0,3.0,2.0,2.0,5.0,2.0,2.0,3.0,1.0,0.0,3.0,0.0,0.0,2.0,3.0,4.0,2.0,3.0,5.0,4.0,3.0,2.0,4.0,5.0,3.0,3.0,6.0,7.0,8.0,3.0,1.0,7.0,2.0,6.0,3.0,2.0,2.0,5.0,11.0,5.0,13.0,6.0,6.0,8.0,9.0,21.0,15.0,19.0,7.0,12.0,23.0,25.0,18.0,28.0,32.0,51.0,57.0,89.0,184.0,328.0,175.0,69.0,51.0,50.0,30.0,51.0,29.0,58.0,61.0,34.0,39.0,26.0,24.0,24.0,19.0,14.0,21.0,22.0,25.0,15.0,14.0,6.0,7.0,9.0,6.0,5.0,3.0,2.0,2.0,1.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,253];
////t.reverse();
//d = convertArrayToGraph(t);
//displayGraph(d);

//d3.json('data1.json', function(data) {
    //console.dir(data);
    //MG.data_graphic({
        //title: "Blue Histogram",
        //data: data,
        //width: 650,
        //height: 350,
        //target: '#temp',
        //x_accessor: 'key',
        //y_accessor: 'value',
    //})
//})


