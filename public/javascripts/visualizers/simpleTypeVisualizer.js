// Simple Type Visualizer - Visualizer for simple data types (string, number)
// will display the data as simple text
'use strict';
let SimpleTypeVisualizer = (function() {

    let exports = {};

    // public functions:

    exports.canDisplay = function(obj){
        // TODO: (?) Do not know about Int32,Double,.. and such, HypnoLog shoudl know them all as 'number'
        // accept only string and number in this Visualizer.
        // convert Int32,Double,.. to number in C# (?)

        let type = obj.type.toLocaleLowerCase();
        if (type === "string"
            || type === "number"
            || type === "int32"
            || type === "double")
            return true;
        return false;
    }

    exports.display = function(obj, parent){
        // return true if we can not visualize the object
        if (!exports.canDisplay(obj))
            return false;

        // create <pre> DOM elements
        let element = document.createElement("pre");
        element.classList.add("line","simple-type");
        element.appendChild(document.createTextNode(obj.value));
        // TODO: add class accordign to tags
        // TODO: add tags element to display the tags
        // TODO: add variable name if given
        parent.appendChild(element);

        // return true, as yes, we can visualize the object
        return true;
    }

    return exports;

})();
