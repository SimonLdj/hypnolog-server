// This is a template for Data Visualizer
//
// Data Visualizer job is to receive HypnoLog data object and visualize it
// in the DOM.
// Data Visualizer do not have to visualize all data and can define which
// data it will visualize.
// 
// Data Visualizer must implement those methods:
//
// canDisplay(obj) : boolean
//  obj - HypnoLog object to visualize
//  return true if can visualize the given object, otherwise return false.
//
// display(obj, parent) : boolean
//  obj - HypnoLog object to visualize.
//  parent - parent DOM element in which visualize should add it's own DOM elements.
//  return true if can visualize the given object, otherwise return false.
//
// TODO: Visualizer receiving parent DOM element to add new DOM elements is probably not a good design.
//       Maybe Visualizer should receive callback to which it will pass new DOM element,
//       then the caller (lets say the window) will receive the new element and will
//       do its own appending logic.
//
'use strict';
let TemplateVisualizer = (function() {

    let exports = {};

    // public functions:

    exports.canDisplay = function(obj){
        // TODO: replace this with your own filtering logic
        // visualize only HypnoLog objects with type "string"
        if (obj.type.toLocaleLowerCase() === "string")
            return true;
        return false;
    }

    exports.display = function(obj, parent){
        // return true if we can not visualize the object
        if (!exports.canDisplay(obj))
            return false;

        // TODO: replace this with your own visualization logic
        // some display logic, such as creating new <pre> DOM elements
        let element = document.createElement("pre");
        element.appendChild(document.createTextNode(obj.value));
        parent.appendChild(element);

        // return true, as yes, we can visualize the object
        return true;
    }

    return exports;

})();
