// Visualize data as graphs
// Using metricsgraphics.js library
//
// Will Visualize only data type "numbersArray"
'use strict';
let GraphVisualizer = (function() {

    let exports = {};

    // public functions:

    exports.canDisplay = function(obj){
        if (obj.type.toLocaleLowerCase() === "numbersarray")
            return true;
        return false;
    }

    exports.display = function(obj, callback){
        // return false if we can not visualize the object
        if (!exports.canDisplay(obj))
            return false;

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

})();
