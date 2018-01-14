// Visualizer using Plotly.js 2d heatmap
//
// Can visualize 2D number array (data.type === "2dNumbersArray")
//

'use strict';
let Plotly2dHeatmapsVisualizer = (function() {

    let exports = {};

    // public functions:

    exports.canDisplay = function(obj){
        // TODO: replace this with your own filtering logic
        // visualize only HypnoLog objects with type "string"
        if (obj.type.toLocaleLowerCase() === "2dnumbersarray")
            return true;
        return false;
    }

    exports.display = function(obj, callback){
        // return true if we can not visualize the object
        if (!exports.canDisplay(obj))
            return false;

        // create <div> to hold the 
        let element = document.createElement("div");
        element.classList.add("line");

        // prepare the data for Plotly
        var plotlyData = [
            {
                z: obj.data,
                type: 'heatmap'
            }
        ];

        // let Plotly create the heat map in the div
        Plotly.newPlot(element, plotlyData);

        // pass the new element to the callback
        callback(element);

        // return true, as yes, visualization was done successfully
        return true;
    }

    return exports;

})();
