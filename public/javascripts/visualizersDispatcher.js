// Visualizer Dispatcher determine which Data Visualizer should display given
// HypnoLog data object.
// 
// Visualize Dispatcher should get collection of visualizers to use,
// then it can be asked to visualize some HypnoLog data object.
'use strict';
// TODO: done assume HL variable exist
HL.visualizersDispatcher = (function() {

    let exports = {};

    // private properties:
    let visualizers = [];

    // public functions:

    // Add given visualizer to visualizers collection to use
    exports.add = function(visualizer) {
        visualizers.push(visualizer);
    }

    // Set the collection of visualizers to use (Dropping all previously given visualizers)
    exports.setVisualizers = function(newVisualizers) {
        visualizers = newVisualizers;
    }

    // Visualize given HypnoLog data object using the collection of visualizers
    exports.visualize = function(data, parent) {
        visualizers.some(function(visualizer) {
            return visualizer.display(data, parent);
        });
    }

    // private functions:
    // none
    
    return exports;

})();
