var mainOutput = $('#output');
var mainContent = document.getElementById("mainOutput");
var watchContent = document.getElementById("watchWindow");
var selectAll = document.getElementById("selectAll");
var lastUpdateTimeElement = $("#lastUpdateTimeValue");

var allRecivedData = [];

function initialize(){
    initializeLastUpdateTime();

    // Set visualizers to use
    HL.visualizersDispatcher.add(NewSessionVisualizer);
    HL.visualizersDispatcher.add(GraphVisualizer);
    HL.visualizersDispatcher.add(SimpleTypeVisualizer);
    HL.visualizersDispatcher.add(DefaultVisualizer);

    // initilialze window filter
    WindowFilter.initialize();

}
initialize();


function connect(){
    // creating a new websocket
    var socket = io.connect('http://localhost:7000');

    // on every message received we print the new data inside the #container div
    socket.on('notification', function (data) {
        console.log("new data from socket");
        //console.log(data);
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

    // update "last update time" in DOM to now
    setLastUpdateTimeNow();

    // Add tags to window filter
    if (data.tags && data.tags.length > 0)
        WindowFilter.addTags(data.tags);

    // display data using visualizers
    HL.visualizersDispatcher.visualize(data, mainContent);

    // Watch section logic
    // TODO: handle watch section logic in better designed code
    if (data.type === "newSession") {
        // clean watch section when new session begines (Note, this i sgood only for synched sessions)
        //TODO: Do we want to clear the watched data?
        clearWatchSection();
    }
    // disply watch data with some window/visualizers logic
    else if(data.debugOption == "watch"){
        //TODO: check if data.value is a json.
        var para = HL.createCustomElement("p", { "id": data.fullName }, HL.createVariableNameElement(data.fullName));
        //TODO: parse the data.value.
        para.appendChild(creatJSONElement(data.value));
        replaceWatchContent(watchContent, para);
    }

    mainContent.scrollTop = mainContent.scrollHeight;
}

// ~~~~~~~~~~~~ Watch section logic ~~~~~~~~~ [start]
// TODO: move all watch-section logic to some module/class/file

function clearWatchSection() {
    while (watchContent.firstChild) {
        watchContent.removeChild(watchContent.firstChild);
    }
}

function creatJSONElement(data, tagsValue) {
    var htmlData = JSON.stringify(data, null, "\t");
    var pre = document.createElement("pre");
    var attributeNode = document.createAttribute("class");
    attributeNode.value = tagsValue;
    pre.setAttributeNode(attributeNode);
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

// ~~~~~~~~~~~~ Watch section logic ~~~~~~~~~ [end]
// ~~~~~~~~~~~~ last Update time ~~~~~~~~~ [start]
// TODO: move all last-update-time logic to some module/class/file

var lastUpdateTime;

function initializeLastUpdateTime(){
    lastUpdateTime = new Date();
    updateLastUpdateTimeDisplay();
    window.setInterval(updateLastUpdateTimeDisplay, 5000);
}
// Set last update time as now
function setLastUpdateTimeNow(){
    lastUpdateTime = new Date();
    updateLastUpdateTimeDisplay();
}

// update "last update time" in DOM (top nav bar)
function updateLastUpdateTimeDisplay(){
    lastUpdateTimeElement.html(timeSince(lastUpdateTime));
}

// For a given date, return a string represent same date as time since
// for example "10 seconds ago" for a date represent time 10 seconds ago
function timeSince(date) {
    var seconds = Math.floor((new Date() - date) / 1000);
    var minutes = (seconds / 60);

    if (minutes >= 1) {
        return Math.floor(minutes) + " minutes ago";
    }

    if (seconds >= 5) {
        return Math.floor(seconds) + " seconds ago";
    }

    return "just now";
}
// ~~~~~~~~~~~~ last Update time ~~~~~~~~~ [end]

