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
         * Try to add the given objects as Visualizer to the visualizers collection for use
         *
         * @return {Promise} when all given visualizers loaded
         */
        exports.addMany = function() {
            // will hold all promises
            let promsArr = [];

            // go over all given visualizers and try to load each one of them
            for(let i = 0; i < arguments.length; i++) {
                promsArr.push(exports.add(arguments[i]));
            }

            // return single Promise when all promises resolved
            return Promise.all(promsArr);
        }

        exports.get = function() {
            return _that.visualizers;
        }

        /**
         * Try to add the given object as Visualizer to the visualizers collection for use
         *
         * @return {Promise} which will be resolved if add successfully
         */
        exports.add = function(obj) {
            // try to add the given object as a Visualizer
            return loadVisualizer(obj)
            .then(function(vis) {
                console.log("Visualizer " + vis.name + " loaded successfully");
                _that.visualizers.push(vis);
                Promise.resolve(obj);
            },
            function(e) {
                console.error("Failed loading visualizer: ");
                console.log(e);
                Promise.reject(e);
            });
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
