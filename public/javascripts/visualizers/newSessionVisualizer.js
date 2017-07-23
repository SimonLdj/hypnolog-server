// New Session message visualizers
// Display title for new session message
'use strict';
let NewSessionVisualizer = (function() {

    let exports = {};

    // public functions:

    exports.canDisplay = function(obj){
        if (obj.type.toLocaleLowerCase() === "newsession")
            return true;
        return false;
    }

    exports.display = function(obj, parent){
        // return true if we can not visualize the object
        if (!exports.canDisplay(obj))
            return false;

        // TODO: decide, is new-session info is also a line in a window
        var headerEl = document.createElement("h3");
        headerEl.appendChild(document.createTextNode("Session " + obj.value));
        parent.appendChild(headerEl);

        var hrEl = document.createElement("hr");
        parent.appendChild(hrEl);

        // return true, as yes, we can visualize the object
        return true;
    }

    return exports;

})();
