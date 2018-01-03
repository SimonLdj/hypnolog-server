// This is a template for Data Visualizer
//
// DataVisualizer job is to create DOM element which represent single
// HypnoLog-data object.  This is on other words to visualize an object.  A
// specific DataVisualizer do not have to visualize all data and can define
// which data it will visualize (for example by checking data type).
// 
// Data Visualizer must implement those methods:
//
// canDisplay(obj) : boolean
//  return true if can visualize the given object, otherwise return false.
//  obj - HypnoLog-data object to visualize
//
// TODO: rename display to createElement, as that's what it actually do.
// display(obj, callback) : boolean
//  Create a DOM element representing the given HypnoLog-data object. Return
//  `true` if visualization was done successfully.
//  obj - HypnoLog-data object to visualize.
//  callback - function which will be called when DOM element visualizing the
//  HypnoLog-data object is ready. First parameter is the newly created DOM
//  element.  This function can be the place to add the new element to the DOM.
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
