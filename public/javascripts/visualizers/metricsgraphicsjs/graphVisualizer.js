// Visualize data as graph
// Using metricsgraphics.js library
// see https://www.metricsgraphicsjs.org/
//
// Display types:
//  "numbersarray", "numbers", "graph", "plot", "linechart", "metricsgraphics-plot" 
//
// Data example:
//  [1,2,3,4,3,2,1]
//
//
'use strict';
// metricsgraphics.js looks for 'd3' dependence so map it for local package
SystemJS.config({
    packages: {
        './javascripts/visualizers/metricsgraphicsjs/': {
            map: {
                d3: "./d3.min.js",
            },
        },
    }
});

define(function (require) {

    // load dependencies
    // note, `d3` is mapped locally for this package
    let d3 = require('d3');
    let MG = require('./metricsgraphics.min.js');
    require('./metricsgraphics.css');

    let displayTypes = ["numbersarray", "numbers", "graph", "plot", "linechart", "metricsgraphics-plot" ];
    let exports = {};

    // public functions:
    exports.name = "Metricsgraphics Graph Visualizer";

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

        // TODO: check if given data is actually collection of numbers (displayable)

        // TODO: display type of array (also when we'll support not only numbers array)

        // create <div> DOM element (to contain graph and text elements)
        let element = document.createElement("div");
        element.classList.add("numbers-array");

        // create graph DOM element
        let gData = convertArrayToGraphData(obj.data);
        let graphEl = createGraphElement(gData,
                     (obj.name && obj.name.length) > 0 ? obj.name : "Numbers Array");
        element.appendChild(graphEl);

        //// create <pre> DOM element to display values as text
        //var preEl = document.createElement("pre");
        //let textEl = document.createTextNode(JSON.stringify(obj.data, null, "\t"));
        //preEl.appendChild(textEl);
        //element.appendChild(preEl);

        // pass the new element to callback
        callback(element);

        // return true, as yes, visualization was done successfully
        return true;
    }

    // private functions: 

    // Convert simple array of objects to array of {index, value} objects.
    // index is the index of the object in the original array, value is the object.
    function convertArrayToGraphData(arr){

        let d = [];
        for (let i = 0; i < arr.length; i++){
            d.push({"index" : i, "value" : arr[i]});
        }

        return d;
    }

    function createGraphElement(data, title){

        let newElement = document.createElement("div");
        newElement.classList.add("graph");

        MG.data_graphic({
            title: title,
            data: data,
            interpolate: d3.curveLinear,
            width: 650,
            height: 350,
            target: newElement,
            x_accessor: 'index',
            y_accessor: 'value',
            x_label: 'index',
            y_label: 'value',
        });
        return newElement;
    }

    return exports;

});
