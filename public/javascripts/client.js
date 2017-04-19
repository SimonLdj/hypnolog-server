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

    // TODO: do some better design then checking any data type

    // Represent the tags of the data
    var tagElement = createCustomElement("div", { "class": "tagElement" }, document.createTextNode(converTagsArrayToString(data.tags || [])));

    // TODO: document what you do here
    if (data.tags) {
        var tags = data.tags;
        for (var tag in tags) {
            var tagName = tags[tag];
            if (allTags.indexOf(tagName) == -1) {
                allTags.push(tagName);
                var checkBox = createCustomElement("input",
                    { "class":"checkbox", "type": "checkbox", "id": tagName, "onclick": "filterDisplay(this);"}, null);
                checkBox.checked = true;
                checkedTags.push(tagName);
                var label = createCustomElement("label", { "for": tagName, "class": "checkbox" },
                    document.createTextNode("#" + tagName));
                checkBoxFilters.appendChild(checkBox);
                checkBoxFilters.appendChild(label);
            }
        }
    }

    // New session data
    if (data.type === "newSession") {
        addNewSession(data.value);
    }
    else if(data.debugOption == "watch"){
        //TODO: check if data.value is a json.
        var para = createCustomElement("p", { "id": data.fullName }, creatNameElement(data.fullName));
        //TODO: parse the data.value.
        para.appendChild(creatJSONElement(data.value));
        replaceWatchContent(watchContent, para);
    }
    // Simple Type data
    // TODO: check all simple types in some normal way
    else if (data.type === "String" || data.type === "Int32" || data.type === "Double"){

        DefaultVisualizer.display(data, mainContent);
    }
    // Numbers array data
    else if (data.type === "numbersArray"){

        GraphVisualizer.display(data, mainContent);

    }
    // Object data
    else if (data.type === "object") {
        var typeElement = createCustomElement("span", { "class": "variable-type"}, null);
        typeElement.innerHTML = data.customType;
        if(data.tags)
            var div = createCustomElement("div", { "class": "object-type " + createClassName(data.tags) }, null);
        else
            var div = createCustomElement("div", { "class": "line object-type user-tag_default_untaged" }, null);
        div.appendChild(tagElement);
        // TODO: display name (if given) for all types, not only simple
        if (data.name)
            div.appendChild(creatNameElement(data.name));
        div.appendChild(typeElement);
        div.appendChild(creatJSONElement(data.value, null));
        mainContent.appendChild(div);
    }
    // Other
    else {
        var div;
        if (data.tags)
            div = createCustomElement("div", { "class": createClassName(data.tags) });
        else
            div = createCustomElement("div", { "class": createClassName(["default_untaged"]) });
        div.appendChild(tagElement);
        div.appendChild(creatJSONElement(data, "unknown-type"));
        mainContent.appendChild(div);
    }

    mainContent.scrollTop = mainContent.scrollHeight;
}

function converTagsArrayToString(tagsArray) {
    if (!tagsArray || tagsArray.length < 1)
        return "";

    return "#" + tagsArray.join(" #");
}

// TODO: this convert string array to simple string, that not what the name indicates
// also, this adds 'line' call, this is also not clear from the name
function createClassName(stringArray) {
    if (stringArray) {
        if (stringArray.length == 1)
            return "line user-tag_" + stringArray.toString();
        var name = stringArray.toString();
        return "line " + name.replace(/\,/g, " user-tag_");
    }
    return null;
}

function createCustomElement(elementType, attributesDic, content) {
    var element = document.createElement(elementType);
    for (var attribute in attributesDic) {
        var attributeNode = document.createAttribute(attribute);
        attributeNode.value = attributesDic[attribute];
        element.setAttributeNode(attributeNode);
    }
    if (content)
        element.appendChild(content);
    return element;
}

function addNewSession(value) {
    // TODO: decide, is new-session info is also a line in a window
    var header = createCustomElement("h3", { "id": "sectionHeader" }, null);
    header.innerHTML = "Session " + value;
    var hr = document.createElement("hr");
    mainContent.appendChild(hr);
    mainContent.appendChild(header);
    //TODO: Do we want to clear the watched data?
    clearWatchSection();
}

function clearWatchSection() {
    while (watchContent.firstChild) {
        watchContent.removeChild(watchContent.firstChild);
    }
}

function creatNameElement(name) {
    var nameElement = createCustomElement("span", { "class": "variable-name" }, null);
    nameElement.innerHTML = name + " :";
    return nameElement;
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
        createClass(".line", "display: block;");
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
    createClass(".line", "display: none;");
    for (var i in checkedTags) {
        createClass(".user-tag_" + checkedTags[i], "display: block;");
    }
}

function diaplayByTag(tag) {
    //Update the checkedTags array
    if (checkedTags.indexOf(tag) == -1)
        checkedTags.push(tag);
    var children = mainContent.getElementsByClassName("user-tag_" + tag);
    //Show the elements with the current checked tag
    createClass(".user-tag_" + tag, "display: block;");
    if(checkedTags.length == allTags.length)
        selectAll.checked = true;
}

function createClass(name, rule) {
    var style = document.createElement('style');
    style.type = 'text/css';
    document.getElementsByTagName('head')[0].appendChild(style);
    if (!(style.sheet || {}).insertRule)
        (style.styleSheet || style.sheet).addRule(name, rule);
    else
        style.sheet.insertRule(name + "{" + rule + "}", 0);
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

