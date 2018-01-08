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

    exports.display = function(obj, callback){
        // return true if we can not visualize the object
        if (!exports.canDisplay(obj))
            return false;

        let element = document.createElement("div");

        var headerEl = document.createElement("h3");
        headerEl.appendChild(document.createTextNode("Session " + obj.value));
        element.appendChild(headerEl);

        var hrEl = document.createElement("hr");
        element.appendChild(hrEl);

        // pass the new element to callback
        callback(element);

        // return true, as yes, visualization was done successfully
        return true;
    }

    return exports;

})();
