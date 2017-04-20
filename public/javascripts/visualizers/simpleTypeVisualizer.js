// Simple Type Visualizer - Visualizer for simple data types (string, number)
// will display the data as simple text
'use strict';
let SimpleTypeVisualizer = (function() {

    let exports = {};

    // public functions:

    exports.canDisplay = function(obj){
        // TODO: accept all simple types (String, Int32, Double, number, ..?)
        // TODO: do not know about Int32 and such, accept only number, convert Int32, Double to number in C# ?
        //if (obj.type.toLocaleLowerCase() === "string")
            return true;
        //return false;
    }

    exports.display = function(obj, parent){
        // return true if we can not visualize the object
        if (!exports.canDisplay(obj))
            return false;

        // create <pre> DOM elements
        let element = document.createElement("pre");
        element.appendChild(document.createTextNode(obj.value));
        // TODO: add 'line', 'simple-type' class 
        // TODO: add class accordign to tags
        // TODO: add tags element to display the tags
        parent.appendChild(element);

        // return true, as yes, we can visualize the object
        return true;
    }

    return exports;

})();
