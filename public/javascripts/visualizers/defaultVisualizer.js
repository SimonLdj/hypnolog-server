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
        element.classList.add("line","unknown-type");

        // append variable name element, if name was given
        let nameElement = HL.createVariableNameElement(obj);
        if (nameElement) element.appendChild(nameElement);

        // show value as text
        let textElement = document.createTextNode(JSON.stringify(obj.value, null, "\t"));
        element.appendChild(textElement);

        // Add class to element according to given tags.
        // This is to allow log filtering.
        // (We filter elements by class, so each class represent tag)
        let userTagsClass = HL.createTagsClass(obj);
        if (userTagsClass.length > 0) element.classList.add(...userTagsClass);

        // append tags element, if given
        let tagsElement = HL.createTagsElement(obj);
        if (tagsElement) element.appendChild(tagsElement);

        // pass the new element to the callback
        callback(element);

        // return true, as yes, visualization was done successfully
        return true;
    }

    return exports;

})();
