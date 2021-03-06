// New Session message visualizers
// Display title for new session message
'use strict';
define(function (require) {

    let exports = {};

    // public functions:
    exports.name = "New Session Visualizer";

    exports.canDisplay = function(obj){
        if (obj.type.toLocaleLowerCase() === "newsession")
            return true;
        return false;
    }

    exports.display = function(obj, callback){
        // return false if we can not visualize the object
        if (!exports.canDisplay(obj))
            return false;

        let element = document.createElement("div");

        var headerEl = document.createElement("h3");
        headerEl.appendChild(document.createTextNode("Session " + obj.data));
        element.appendChild(headerEl);

        var hrEl = document.createElement("hr");
        element.appendChild(hrEl);

        // pass the new element to callback
        callback(element);

        // return true, as yes, visualization was done successfully
        return true;
    }

    return exports;

});
