var mainOutput = $('#output');
var mainContent = document.getElementById("content");
var watchContent = document.getElementById("watchContent");
var checkBoxFilters = document.getElementById("checkBoxFilters");
var selectAll = document.getElementById("selectAll");

var allRecivedData = [];
var allTags = ["default_untaged"];
var checkedTags = ["default_untaged"];

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
        mainContent.scrollTop = mainContent.scrollHeight;
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

    // TODO: do some better design then checking any data type

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
        var para = createCustomElement("p", { "id": data.fullName }, creatNameElement(data.name));
        //TODO: parse the data.value.
        para.appendChild(creatJSONElement(data.value));
        replaceWatchContent(watchContent, para);
    }
    // Simple Type data
    // TODO: check all simple types in some normal way
    else if (data.type === "String" || data.type === "Int32" || data.type === "Double"){
        var classNames = "";
        if (data.tags)
            classNames += createClassName(["simple-type", data.tags]);
        else
            classNames += createClassName(["simple-type", "default_untaged"]);
        var para = createCustomElement("pre", { "class": classNames }, null);
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
        // TODO: number array should have tags as well

        var gData = convertArrayToGraph(data.value);
        var element = displayGraph(gData,
                     (data.name && data.name.length) > 0 ? data.name : "Unnamed");
        var div = createCustomElement("div", { "class": "line numbers-array user-tag_default_untaged" }, element);
        div.appendChild(creatJSONElement(data.value, createClassName(data.tags)));
        mainContent.appendChild(div);

    }
    // Object data
    else if (data.type === "object") {
        var typeElement = createCustomElement("span", { "class": "variable-type"}, null);
        typeElement.innerHTML = data.customType;
        if(data.tags)
            var div = createCustomElement("div", { "class": "line object-type " + createClassName(data.tags) }, null);
        else
            var div = createCustomElement("div", { "class": "line object-type user-tag_default_untaged" }, null);
        // TODO: display name (if given) for all types, not only simple
        if (data.name)
            div.appendChild(creatNameElement(data.name));
        div.appendChild(typeElement);
        div.appendChild(creatJSONElement(data.value, null));
        mainContent.appendChild(div);
    }
    // Other
    else {
        if (data.tags)
            mainContent.appendChild(creatJSONElement(data, createClassName(data.tags) + " unknown-type"));
        else
            mainContent.appendChild(creatJSONElement(data, createClassName(["default_untaged"]) + " unknown-type"));
    }

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
    header.innerHTML = "Section " + value;
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


function displayGraph(data, title){
    var newElement = document.createElement("div");
    //mainContent.appendChild(newElement);
    MG.data_graphic({
        title: title,
        data: data,
        width: 650,
        height: 350,
        target: newElement,
        x_accessor: 'key',
        y_accessor: 'value',
    })
    return newElement;
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


