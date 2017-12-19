// Visualize data as graphs
// Using metricsgraphics.js library
//
// Will Visualize only data type "numbersArray"
'use strict';
let GraphVisualizer = (function() {

    let exports = {};

    // public functions:

    exports.canDisplay = function(obj){
        if (obj.type === "numbersArray")
            return true;
        return false;
    }

    exports.display = function(obj, callback){
        // return false if we can not visualize the object
        if (!exports.canDisplay(obj))
            return false;

        // TODO: display type of array (also when we'll support not only numbers array)
        // TODO: display variable name if given (now displaying variable name as graph title if given?)

        // create <div> DOM element (to contain graph and text elements)
        let element = document.createElement("div");
        element.classList.add("line","numbers-array");

        // create graph DOM element
        let gData = convertArrayToGraphData(obj.value);
        let graphEl = createGraphElement(gData,
                     (obj.name && obj.name.length) > 0 ? obj.name : "");
        element.appendChild(graphEl);

        // create <pre> DOM element to display values as text
        var preEl = document.createElement("pre");
        let textEl = document.createTextNode(JSON.stringify(obj.value, null, "\t"));
        preEl.appendChild(textEl);
        element.appendChild(preEl);

        // Add class to element according to given tags.
        // This is to allow log filtering.
        // (We filter elements by class, so each class represent tag)
        let userTagsClass = HL.createTagsClass(obj);
        if (userTagsClass.length > 0) element.classList.add(...userTagsClass);

        // append tags element, if given
        let tagsElement = HL.createTagsElement(obj);
        if (tagsElement) element.appendChild(tagsElement);

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
