// Default Visualizer - can visualize all data types
// will display the data as simple text
'use strict';
let DefaultVisualizer = (function() {

    let exports = {};

    // public functions:

    exports.canDisplay = function(obj){
        return true;
    }

    exports.display = function(obj, parent){
        // return true if we can not visualize the object
        if (!exports.canDisplay(obj))
            return false;

        // create <pre> DOM elements
        let element = document.createElement("pre");
        element.classList.add("line","unknown-type");
        // show value as text
        let textElement = document.createTextNode(JSON.stringify(obj.value, null, "\t"));
        element.appendChild(textElement);
        // TODO: add class accordign to tags
        // TODO: add tags element to display the tags
        // TODO: add variable name if given
        parent.appendChild(element);

        // return true, as yes, we can visualize the object
        return true;
    }

    return exports;

})();
