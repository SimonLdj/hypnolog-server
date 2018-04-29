'use strict';
/**
 * Visualizer for rectangles.
 * Objects with `width` and `height`.
 *
 * This is written as part of "Add a Visualizers Example".
 */
define(function (require) {

    let exports = {};

    exports.name = "Rectangle Visualizer";

    exports.canDisplay = function(obj) {
        if (obj.type.toLocaleLowerCase() === "rect")
            return true;
        return false;
    }

    exports.display = function(obj, callback) {
        let element = document.createElement("div");
        element.style.width = obj.data.width;
        element.style.height = obj.data.height;
        element.style.backgroundColor = "lightgreen";
        element.innerText = obj.data.width + "x" + obj.data.height;

        callback(element); // pass the new element to the callback
        return true; // return true, as yes, visualization was done successfully
    }

    return exports;
});
