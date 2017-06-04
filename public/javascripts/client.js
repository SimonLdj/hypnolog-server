var mainOutput = $('#output');
var mainContent = document.getElementById("mainOutput");
var watchContent = document.getElementById("watchWindow");
var checkBoxFilters = document.getElementById("filter");
var selectAll = document.getElementById("selectAll");
var lastUpdateTimeElement = $("#lastUpdateTimeValue");

var allRecivedData = [];
var allTags = ["default_untaged"];
var checkedTags = ["default_untaged"];

function initialize(){
    initializeLastUpdateTime();

    // Set visualizers to use
    HL.visualizersDispatcher.add(NewSessionVisualizer);
    HL.visualizersDispatcher.add(GraphVisualizer);
    HL.visualizersDispatcher.add(SimpleTypeVisualizer);
    HL.visualizersDispatcher.add(DefaultVisualizer);

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

    // update "last update time" in DOM to now
    setLastUpdateTimeNow();

    // Represent the tags of the data

    // TODO: document what you do here
    if (data.tags) {
        var tags = data.tags;
        for (var tag in tags) {
            var tagName = tags[tag];
            if (allTags.indexOf(tagName) == -1) {
                allTags.push(tagName);
                var checkBox = HL.createCustomElement("input",
                    { "class":"checkbox", "type": "checkbox", "id": tagName, "onclick": "filterDisplay(this);"}, null);
                checkBox.checked = true;
                checkedTags.push(tagName);
                var label = HL.createCustomElement("label", { "for": tagName, "class": "checkbox" },
                    document.createTextNode("#" + tagName));
                checkBoxFilters.appendChild(checkBox);
                checkBoxFilters.appendChild(label);
            }
        }
    }

    // display data using visualizers
    HL.visualizersDispatcher.visualize(data, mainContent);

    // New session data
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
    // Simple Type data
    // TODO: check all simple types in some normal way
    // Numbers array data
    // Object data
    // Other

    mainContent.scrollTop = mainContent.scrollHeight;
}

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
//Invoke when the 'All' checkbox checked
function showAll() {
    if (selectAll.checked) {
        var allCheckboxs = checkBoxFilters.childNodes;
        for (var i in allCheckboxs) {
            allCheckboxs[i].checked = true;
        }
        //Update the checkedTags array
        checkedTags = [];
        for (i in allTags) {
            checkedTags.push(allTags[i]);
        }
        HL.createClass(".line", "display: block;");
    }
    else
        hideByTag(null);
}
//Invoke when a checkbox checked or unchecked
function filterDisplay(checkbox) {
    selectAll.checked = false;
    if (checkbox.checked) {
        diaplayByTag(checkbox.id);
    }
    else {
        hideByTag(checkbox.id);
    }
}

function hideByTag(tag) {
    var index = checkedTags.indexOf(tag);
    //Update the checkedTags array
    if (tag && index > -1)
        checkedTags.splice(index, 1);
    //Hide all the Nodes, the last update should show the element
    HL.createClass(".line", "display: none;");
    for (var i in checkedTags) {
        HL.createClass(".user-tag_" + checkedTags[i], "display: block;");
    }
}

function diaplayByTag(tag) {
    //Update the checkedTags array
    if (checkedTags.indexOf(tag) == -1)
        checkedTags.push(tag);
    var children = mainContent.getElementsByClassName("user-tag_" + tag);
    //Show the elements with the current checked tag
    HL.createClass(".user-tag_" + tag, "display: block;");
    if(checkedTags.length == allTags.length)
        selectAll.checked = true;
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

