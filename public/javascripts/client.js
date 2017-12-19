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


// Connect to servers websocket
function connect(){
    // creating a new websocket
    var socket = io.connect('http://localhost:7000');

    // on every message received we print the new data inside the #container div
    socket.on('notification', function (data) {
        handleNewData(data);
    });

    // TODO: check connection successfully created, log and display to user.

};
connect();

// Handle new data received,
// add data to the DOM using visualizers
function handleNewData(data){

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
    // TODO: use this variable to allow users filter/modify the received data
    allRecivedData.push(data);

    // update "last update time" in DOM to now
    setLastUpdateTimeNow();

    // Add tags to window filter
    if (data.tags && data.tags.length > 0)
        WindowFilter.addTags(data.tags);

    // display data using visualizers
    HL.visualizersDispatcher.visualize(data, function(element) {
        mainContent.appendChild(element);
    });

    // Watch section logic
    // TODO: handle watch section logic in better designed code
    if (data.type === "newSession") {
        // clean watch section when new session begines (Note, this is good only for synched sessions)
        //TODO: Do we want to clear the watched data?
        clearWatchSection();
    }
    else if(data.debugOption == "watch"){
        var element = creatWatchElement(data);
        replaceWatchContent(watchContent, element);
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

function creatWatchElement(data) {

    // TODO: parse the data.value (using visualizers? watch-specific visualizers?)
    // TODO: display watch data with some window/visualizers logic

    // Create <p> with variable name and <pre> with data value
    var pElement = document.createElement("p");
    pElement.appendChild(HL.createVariableNameElement(data));
    pElement.setAttribute("id", "watchElement_"+data.fullName);

    var preEl = document.createElement("pre");
    var textEl = document.createTextNode(JSON.stringify(data.value, null, "\t"));
    preEl.appendChild(textEl);

    pElement.appendChild(preEl);

    return pElement;
}

function replaceWatchContent(watchSectionEl, newData){
    if(watchSectionEl.hasChildNodes()){
        var children = watchSectionEl.childNodes;
        if(children.length > 1){
            for(var i = 0; i < children.length; i++){
                if(children[i].id == newData.id){
                    watchSectionEl.removeChild(watchSectionEl.childNodes[i]);
                }
            }
        }
    }
    else{
        var header = document.createElement("h2");
        header.innerHTML = "Watch Section";
        watchSectionEl.appendChild(header);
    }
    watchSectionEl.appendChild(newData);
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

