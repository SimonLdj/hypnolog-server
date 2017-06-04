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
        // append variable name element, if name was given
        let nameElement = HL.createVariableNameElement(obj);
        if (nameElement) element.appendChild(nameElement);
        // append value as simple text node
        element.appendChild(document.createTextNode(obj.value));
        // append tags element, if given
        let tagsElement = HL.createTagsElement(obj);
        if (tagsElement) element.appendChild(tagsElement);
        // TODO: add class accordign to tags
        parent.appendChild(element);

        // return true, as yes, we can visualize the object
        return true;
    }

    return exports;

})();
