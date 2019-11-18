// Code Hight Light Visualizer
//
// uses highlight.js (https://highlightjs.org/) to display Syntax highlighted code.
//
//
'use strict';
define(function (require) {

    // load dependencies
    var hljs = require('./highlight.pack.js');
    // require('./default.css');
    require('./androidstudio.css');
    require('./custom.css');

    let displayTypes = ["object", "code", "json", "html"];
    let exports = {};

    // public functions:
    exports.name = "Highlight.js Visualizer";

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

        // creating new <pre> DOM elements
        let element = document.createElement("pre");
        element.appendChild(document.createTextNode((JSON.stringify(obj.data, null, "\t"))));

        // let highlight.js do its work
        hljs.highlightBlock(element);

        // pass the new element to the callback
        callback(element);

        // return true, as yes, visualization was done successfully
        return true;
    }

    return exports;

});
