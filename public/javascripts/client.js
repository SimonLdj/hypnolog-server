var lastUpdateTimeElement = $("#lastUpdateTimeValue");

var allRecivedData = [];

// will hold validation function for object coming from the server
var hypnologObjValidator = null;

function initialize(){
    initializeLastUpdateTime();

    // TODO: refactor WindowsDispatcher to be object which you create (new)
    // then pass container element to constructor
    HL.WindowsDispatcher.setContainer(document.getElementById("windowsContainer"));
    // TODO: refactor windows to be objects which you create
    // For example in case we want to use same windows twice
    HL.WindowsDispatcher.add(DefaultWindow);


    // TODO: load schema dynamically, the same one from /doc folder
    var schema = {
        //"$schema": "http://json-schema.org/draft-06/schema#",
        "title": "HypnoLog Data Object",
        "description": "A Data which is logged using HypnoLog. HypnoLog server should receive this Object via HTTP API",
        "type" : "object",
        "properties" : {
            "data" : {
                "description": "The data which is logged",
            },
            "type" : {
                "description": "Type of the data",
                "type": "string"
            },
        },
        "required": ["data", "type"],
    }
    // TODO: make suer we using Ajv with draft-06 if needed,
    // "To use Ajv with draft-06 schemas you need to explicitly add the meta-schema to the validator instance"
    var ajv = new Ajv();
    // Create validation function to validate data coming from the server
    hypnologObjValidator = ajv.compile(schema);

}
initialize();


// Connect to servers websocket
function connect(){

    var url = new URL(window.location.href);

    // creating a new websocket
    var socket = io.connect(url.origin);

    socket.on('notification', function (message) {
        handleNewData(message);
    });

    // TODO: check connection successfully created, log and display to user.

};
connect();

// Handle new message received from the server
function handleNewData(message) {

    // Validate incoming message to be valid HypnoLog-data object according to the schema
    var valid = hypnologObjValidator(message);
    if (!valid) {
        var errorString =
            "HypnoLog error: Received invalid message from the server, the message is\
 not a valid HypnoLog-data object. Please make sure the logged object\
 valid according to the HypnoLog schema. See server API\
 documentation.";

        // Log error to console
        console.error(errorString);
        console.log(hypnologObjValidator.errors)
        console.log(message)

        // Log error as HypnoLog-data object
        // replace the received message with new message containing error data,
        // this will display the error message to the user
        // TODO: make some special visualization for hypnolog-errors (?)
        message = {
            "type" : "HypnoLog-error",
            "data" : {
                "errorMessage" : errorString,
                "validatorErrorMessage" : (hypnologObjValidator.errors[0] ? hypnologObjValidator.errors[0].message : ""),
                "fullValidatorError" : hypnologObjValidator.errors,
                "receivedMessage" : message,
            }
        }
    }

    // Now, after we validated the incoming message is a valid HypnoLog-data object, use it

    // TODO: use this variable to allow users filter/modify the received data
    allRecivedData.push(message);

    // update "last update time" in DOM to now
    setLastUpdateTimeNow();

    // let WindowsDispatcher pass the received message to all its windows
    HL.WindowsDispatcher.display(message);
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

