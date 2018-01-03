var lastUpdateTimeElement = $("#lastUpdateTimeValue");

var allRecivedData = [];

function initialize(){
    initializeLastUpdateTime();

    // TODO: refactor WindowsDispatcher to be object which you create (new)
    // then pass container element to constructor
    HL.WindowsDispatcher.setContainer(document.getElementById("windowsContainer"));
    // TODO: refactor windows to be objects which you create
    // For example in case we want to use same windows twice
    HL.WindowsDispatcher.add(DefaultWindow);
    HL.WindowsDispatcher.add(WatchWindow);
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

    // let WindowsDispatcher pass the received data to all its windows
    HL.WindowsDispatcher.display(data);
}

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

