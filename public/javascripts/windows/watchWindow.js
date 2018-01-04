// Watch window act like watch window in popular IDEs (like VS).
// It will display the last logged value of a variable.
// Not exactly, read full description.
// 
// NOTE: This is not a well designed feature, and it might be refactored or deleted.
// some of the problems are:
// - Clear API is not set for when to watch a variable (and not only log it)
//   Now data.debugOption == "watch" is used.
// - How to keep track about same variable (use it's full name - not only local name),
//   also display the full name to avoid 2 variables with same name.
// - How to make the watched variable always up-to-date, now it is updated only when user log it.
//   This is more like "Last value window" and not actually "Watch window" as known from IDEs.
//
// TODO: refactor Watch Window
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

        var header = document.createElement("h2");
        header.innerHTML = "Watch Section";
        mainContainerEl.appendChild(header);

        // pass the new DOM element to one who called us
        callback(mainContainerEl);
    }

    exports.display = function(data) {

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
