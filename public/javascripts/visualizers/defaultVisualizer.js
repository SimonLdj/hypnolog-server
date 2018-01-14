// Default Visualizer - can visualize all data types
// will display the data as simple text
'use strict';
let DefaultVisualizer = (function() {

    let exports = {};

    // public functions:

    exports.canDisplay = function(obj){
        return true;
    }

    exports.display = function(obj, callback){
        // return false if we can not visualize the object
        if (!exports.canDisplay(obj))
            return false;

        // create <pre> DOM elements
        let element = document.createElement("pre");
        element.classList.add("unknown-type");

        // show data as text
        let textElement = document.createTextNode(JSON.stringify(obj.data, null, "\t"));
        element.appendChild(textElement);

        // pass the new element to the callback
        callback(element);

        // return true, as yes, visualization was done successfully
        return true;
    }

    return exports;

})();
