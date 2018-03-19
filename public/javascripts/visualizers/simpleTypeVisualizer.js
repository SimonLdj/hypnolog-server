// Simple Type Visualizer - Visualizer for simple data types (string, number)
// will display the data as simple text
//
// Display types:
//  "string", "str", "s", "number", "int", "int32", "double"
//
// Data example:
//  "Hello world"
//
'use strict';
let SimpleTypeVisualizer = (function() {

    let displayTypes = ["string", "str", "s", "number", "int", "int32", "double"];
    let exports = {};

    // public functions:

    exports.canDisplay = function(obj){
        // Check if we support given object type
        if (displayTypes.some(s => s === obj.type.toLocaleLowerCase()))
            return true;
        return false;
    }

    exports.display = function(obj, callback){
        // return false if we can not visualize the object
        if (!exports.canDisplay(obj))
            return false;

        // create <pre> DOM elements
        let element = document.createElement("pre");
        element.classList.add("simple-type");

        // append data as simple text node
        element.appendChild(document.createTextNode(obj.data));

        // pass the new element to callback
        callback(element);

        // return true, as yes, visualization was done successfully
        return true;
    }

    return exports;

})();
