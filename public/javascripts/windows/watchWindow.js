// TODO: Document
//
'use strict';
let WatchWindow = (function() {

    let exports = {};

    // DOM element which will hold all other elements
    // Will be created when createWindowElement method called
    let mainContainerEl = null;

    // public functions:

    exports.createWindowElement = function(callback) {
        // create <div class="watch-window"></div>
        // set it as main container
        mainContainerEl = document.createElement("div");
        mainContainerEl.classList.add("watch-window");

        // pass the new DOM element to one who called us
        callback(mainContainerEl);
    }

    exports.display = function(data, callback){

        // Watch section logic
        // TODO: handle watch section logic in better designed code
        if (data.type === "newSession") {
            // clean watch section when new session begines (Note, this is good only for synched sessions)
            clearWatchSection();
        }
        else if(data.debugOption == "watch"){
            var element = creatWatchElement(data);
            replaceWatchContent(mainContainerEl, element);
        }
    }

    // private functions:

    function clearWatchSection() {
        while (mainContainerEl.firstChild) {
            mainContainerEl.removeChild(mainContainerEl.firstChild);
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

    // TODO: rewrite replaceWatchContent method
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
