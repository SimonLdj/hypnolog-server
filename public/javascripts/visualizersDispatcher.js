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

    // TODO: rename VisualizersDispatcher.visualize to "display" to match all other naming
    // Call VisualizersDispatcher.visualize 'display' to match all other functions
    // Visualize given HypnoLog data object using the collection of visualizers
    // data - Hypnolog data object to visualize
    //  callback - function which will be called when visualization is ready. First
    //  parameter is the newly created DOM element which visualize the data. This
    //  function is the place to add the new element to the DOM.
    exports.visualize = function(data, callback) {

        // find the first visualizer which can display the data
        // remember if some visualizer which can display the data was found
        let foundSome = visualizers.some(function(visualizer) {
            return visualizer.display(data, callback);
        });

        if (foundSome == false) {
            // warn the user in case no visualizer which can display the data was found
            console.warn("VisualizersDispatcher couldn't find even one visualizer to display the data. Use `VisualizersDispatcher.add` to add visualizers.");
            console.dir(data);
        }

    }

    // private functions:
    // none
    
    return exports;

})();
