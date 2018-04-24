// Image Visualizer
// Visualize images data.
// Support image data encoded in base64.
//
// Display types:
//  "string", "str", "s", "number", "int", "int32", "double"
//
// Data example:
//  "data:image/gif;base64,R0lGODlhCwALAIAAAAAA3pn/ZiH5BAEAAAEALAAAAAALAAsAAAIUhA+hkcuO4lmNVindo7qyrIXiGBYAOw=="
//
//
'use strict';
define(function (require) {

    let displayTypes = ["image", "img", "base64-img"];
    let exports = {};

    // public functions:
    exports.name = "Image Visualizer";

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

        // visualization logic
        var imgElement = new Image();   // Create new img element
        imgElement.src = 'data:image/gif;base64,'+obj.data;

        // pass the new element to the callback
        callback(imgElement);

        // return true, as yes, visualization was done successfully
        return true;
    }

    return exports;

});
