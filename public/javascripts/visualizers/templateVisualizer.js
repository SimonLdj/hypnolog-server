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
//  return true if can visualize the given object, otherwise return false.
//  obj - HypnoLog object to visualize
//
// display(obj, callback) : boolean
//  Visualize the given HypnoLog-object. Return True if visualization was
//  done successfully.
//  obj - HypnoLog object to visualize.
//  callback - function which will be called when visualization is ready. First
//  parameter is the newly created DOM element which visualize the data. This
//  function is the place to add the new element to the DOM.
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

    exports.display = function(obj, callback){
        // return true if we can not visualize the object
        if (!exports.canDisplay(obj))
            return false;

        // TODO: replace this with your own visualization logic
        // some display logic, such as creating new <pre> DOM elements
        let element = document.createElement("pre");
        element.appendChild(document.createTextNode(obj.value));
        parent.appendChild(element);

        // pass the new element to the callback
        callback(element);

        // return true, as yes, visualization was done successfully
        return true;
    }

    return exports;

})();
