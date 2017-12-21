// TODO: Document
//
'use strict';
let WatchWindow = (function() {

    let exports = {};

    // TODO: don't assume DOM exist for this window
    let watchContent = document.getElementById("watchWindow");

    // public functions:

    exports.display = function(data, callback){

        // Watch section logic
        // TODO: handle watch section logic in better designed code
        if (data.type === "newSession") {
            // clean watch section when new session begines (Note, this is good only for synched sessions)
            clearWatchSection();
        }
        else if(data.debugOption == "watch"){
            var element = creatWatchElement(data);
            replaceWatchContent(watchContent, element);
        }
    }

    // private functions:

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

    return exports;

})();
