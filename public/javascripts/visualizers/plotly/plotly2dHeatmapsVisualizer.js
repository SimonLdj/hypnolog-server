// Visualizer using Plotly.js 2d heatmap
//
// Can visualize 2D number array (data.type === "2dNumbersArray")
//
// Data example:
//  [
//      [1,2,3],
//      [2,2,2],
//      [3,2,1]
//  ]
//
'use strict';
define(function (require) {

    // import dependencies
    var Plotly = require('./plotly-v1.31.2.min.js');


    let displayTypes = ["heatmap", "plotly-heatmap", "2dnumbersarray"];
    let exports = {};

    // public functions:
    exports.name = "Plotly Heatmap Visualizer";

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

        // create <div> to hold the ploty elements
        let element = document.createElement("div");

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

});
