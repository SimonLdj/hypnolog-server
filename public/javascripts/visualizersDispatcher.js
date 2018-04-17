// VisualizersDispatcher determine which DataVisualizer should display given
// HypnoLog data object.
// 
// VisualizersDispatcher should get collection of visualizers to use,
// then it can be asked to visualize some HypnoLog data object.
//

'use strict';
// TODO: don't assume HL variable exist
HL.visualizersDispatcher = (function() {

    let exports = {};

    // private properties:
    let visualizers = [];

    // public functions:

    // Add the given DataVisualizer to the visualizers collection to use
    exports.add = function(visualizer) {
        // TODO: verify somehow the given object is a visualizer
        visualizers.push(visualizer);
    }

    // Set the collection of visualizers to use (Dropping all previously given visualizers)
    // newVisualizers - array of DataVisualizer s
    exports.setVisualizers = function(newVisualizers) {
        visualizers = newVisualizers;
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
        let matchingVisualizer = visualizers.find(function(visualizer) {
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
    // none
    
    return exports;

})();
