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

        // TODO: decide, is new-session info is also a line in a window
        // if so, add the .line CSS class.
        // note: adding this will make the element to be effected by tag filter,
        // meaning if all tags are hidden, this will be hidden as well (not
        // sure we want to do this).
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
