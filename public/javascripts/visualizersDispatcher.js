'use strict';
define(function (require) {

    /**
     * VisualizersDispatcher determine which DataVisualizer (or just visualize) should display given
     * HypnoLog-data object.
     *
     * VisualizersDispatcher should get collection of visualizers to use,
     * then it can be asked to visualize some HypnoLog-data object.
     */
    return function VisualizersDispatcher() {

        // private properties:
        let _that = this;
        this.visualizers = [];

        // public functions:
        let exports = {};

        /**
         * Try to add the given objects as Visualizer to the visualizers collection to use.
         * Note, the visualizers will be added only once all visualizers loaded (or failed to load),
         * this means until the Promise is not resolved, even the successfully loaded visualizers
         * can not be assumed as add.
         *
         * @param {...*} toAddVisualizers - Visualizer like objects. Should be `object` already a
         * valid Visualizer or `string` represent path to script file.
         * @return {Promise} Single Promise when all visualizers loaded (or failed to load). Result
         * is an array contain successfully loaded visualizers and `null` as failed to load
         * visualizers. Note array order is the same as order of given visualizers.
         * Note: Promise will be marked as resolve even when if some visualizers failed to load!
         */
        exports.add = function(toAddVisualizers) {
            // will hold all promises
            let promsArr = [];

            // go over all given function arguments,
            // and make a promise which try to load it as a Visualizer
            for(let i = 0; i < arguments.length; i++) {
                promsArr.push(
                    // the promise which try to add the Visualizer
                    loadVisualizer(arguments[i])
                    .then(v => {
                        console.log("Visualizer " + v.name + " loaded successfully");
                        return Promise.resolve(v);
                    })
                    // Note, we catch all errors while loading visualizers, so the ones which loaded
                    // successfully will be added (don't break the `Promise.all`).
                    // For those who fail to load, set result as null, and ignore it later.
                    .catch(e => {
                        console.error("Error while loading Visualizer: " + arguments[i]);
                        console.error(e);
                        return Promise.resolve(null);
                    })
                );
            }

            // TODO: Try to improve: add successfully loaded visualizers immediately to the
            // collection, don't wait for others. The problem is to do this while keeping the
            // original order of the given visualizers.

            // Wait for all visualizers to load.
            return Promise.all(promsArr)
            .then(visualizersArr => {
                // add all successfully loaded visualizers
                // Note, the result given by Promise.all maintain the original order, regardless of
                // which Visualizer loaded first.
                // "Returned values will be in order of the Promises passed, regardless of
                // completion order."
                // This is important, as visualizer order in the collection matters.
                visualizersArr.forEach(v => {
                    // skip failed-to-load visualizers
                    if (!v) return;
                    _that.visualizers.push(v);
                });
                // return single Promise when all visualizers loaded. Result contain loaded and
                // unloaded visualizers
                return Promise.resolve(visualizersArr);
            });
        }

        /**
         * Get visualizers collection.
         * Note: this is the same copy as used, and therefor shouldn't be modified.
         * TODO: return a copy to avoid modifications.
         *
         * @return {Array} Collection of visualizers used
         */
        exports.get = function() {
            return _that.visualizers;
        }

        /**
        * Visualize given HypnoLog data object using the collection of visualizers
        *
        * @param {Object} obj  - Object to visualize. This should be a valid `HypnoLog-data` object.
        * @param {function} callback - Function which will be called when the newly DOM element created
        * and ready to use. Of signature `(element)`, when first parameter is the newly created DOM
        * element. This function can be the place to add the new element to the DOM.
        */
        exports.visualize = function(obj, callback) {
            // TODO: consider refactor display return the newly created element, or null (instead of calling callback)
            // TODO: rename VisualizersDispatcher.visualize to "display" to match all other naming.
            // TODO: rename it better to "createElement" - as this is what this should do

            // find the first visualizer which can display the object
            let matchingVisualizer = _that.visualizers.find(function(visualizer) {
                return visualizer.canDisplay(obj);
            });

            if (matchingVisualizer) {
                matchingVisualizer.display(obj, callback);
            } else {
                // warn the user in case no visualizer which can display the obj was found
                console.warn("VisualizersDispatcher couldn't find even one visualizer to display the object. Use `VisualizersDispatcher.add` to add visualizers.");
                console.dir(obj);
            }

        }

        // private functions:

        /**
         * Try to load given object as visualizer.
         * If object already a visualizer, just return it.
         * If it is a string, try to use it as a path to module which represent a visualizer.
         *
         * @param {Object} obj  - Should be `object` which implement visualizer properties or `string` represent path to script file
         * @return {Promise}
         */
        function loadVisualizer(obj) {
            // try check if given object already a visualizer
            if (isValidVisualizer(obj)) {
                return Promise.resolve(obj);
            }
            // try load visualizer as path to script file
            if (typeof obj === "string") {
                return loadVisualizerFromFile(obj);
            }
            // try load visualizer as path to script file
            if (typeof obj === "object" && typeof obj.path === "string") {
                return loadVisualizerFromFile(obj.path);
            }
            // otherwise, reject
            return Promise.reject("Unknown object type for visualizer. Should be `object` which implement visualizer properties or `string` represent path to script file");
        }

        /**
         * Load visualizer from given string path.
         * This will load the script file at the given path and will check if it is a valid
         * Visualizer.
         *
         * @param {String} path  - represent path to script file
         * @return {Promise}
         */
        function loadVisualizerFromFile(path) {
            // Load module from path
            return System.import(path)
            .then(function(module) {
                // check if loaded module is actually a visualizer
                if (isValidVisualizer(module)) {
                    return Promise.resolve(module);
                } else {
                    return Promise.reject(new Error("Loaded module is not a valid `Visualizer` object"));
                }
            });
        }

        /**
        * Check if given object implement all function a valid visualizer should.
        *
        * @return {Boolean}
        */
        function isValidVisualizer(v) {
            return (typeof v === "object")
                && (typeof v.canDisplay === 'function')
                && (typeof v.display === 'function');
        }

        return exports;
    }

});
