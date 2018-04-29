'use strict';
/**
 * This is a template for `Data Visualizer`
 *
 * Data Visualizer jobs is to create DOM element which represent single
 * `HypnoLog-data` object. This is in other words, to visualize an object.
 * A specific Data Visualizer do not have to visualize all data and can define
 * which data it will visualize (see `canDisplay` function).
 *
 * Any Data Visualizer must implement those functions:
 * `canDisplay`
 * `display`
 *
 * See future code and documentation about those functions.
 *
 */
define(function (require) {

    let exports = {};

    // public functions:

    /**
     * Visualizer name. Mostly for debugging, Optional.
     */
    exports.name = "Template Visualizer";

    /**
     * Check if this Visualizer can/should visualize the given object.
     * This should be a quick check, and mainly based on objects type (`obj.type`).
     *
     * @param {Object} obj  - Object to visualize. This should be a valid HypnoLog-data`.
     * @param {String} obj.type
     * @param {Object} obj.data
     *
     * @return {Boolean} `true` if can visualize the given object, `false` otherwise.
     */
    exports.canDisplay = function(obj) {
        // TODO: replace this with your own filtering logic
        // visualize only HypnoLog objects with type "string"
        if (obj.type.toLocaleLowerCase() === "string")
            return true;
        return false;
    }

    // TODO: rename display to createElement, as that's what it actually do.
    // TODO: consider refactor display return the newly created element, or null (instead of calling callback)
    /**
     * Create new DOM element representing the given `HypnoLog-data` object.
     *  callback - function which will be called when DOM element visualizing the
     *  HypnoLog-data object is ready. First parameter is the newly created DOM
     *  element.  This function can be the place to add the new element to the DOM.
     *
     * @param {Object} obj  - Object to visualize. This should be a valid `HypnoLog-data` object.
     * @param {String} obj.type
     * @param {Object} obj.data
     * @param {function} callback - Function which will be called when the newly DOM element created
     * and ready to use. Of signature `(element)`, when first parameter is the newly created DOM
     * element. This function can be the place to add the new element to the DOM.
     *
     * @return {Boolean} `true` if visualization was done successfully, `false` otherwise.
     */
    exports.display = function(obj, callback) {
        // return false if we can not visualize the object
        if (!exports.canDisplay(obj))
            return false;

        // TODO: replace this with your own visualization logic
        // some display logic, such as creating new <pre> DOM elements
        let element = document.createElement("pre");
        element.appendChild(document.createTextNode(obj.data));

        // pass the new element to the callback
        callback(element);

        // return true, as yes, visualization was done successfully
        return true;
    }

    return exports;

});
