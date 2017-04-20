// Visualize data as graphs
// Using metricsgraphics.js library
//
// Will Visualize onlt data type "numbersArray"
'use strict';
let GraphVisualizer = (function() {

    let exports = {};

    // public functions:

    exports.canDisplay = function(obj){
        if (obj.type === "numbersArray")
            return true;
        return false;
    }

    exports.display = function(obj, parent){

        if (!exports.canDisplay(obj))
            return false;

        let tagElement = HL.createCustomElement("div", { "class": "tagElement" },
            document.createTextNode(HL.converTagsArrayToString(obj.tags || [])));

        // TODO: display type for array
        let gData = convertArrayToGraph(obj.value);

        let graphElement = displayGraph(gData,
                     (obj.name && obj.name.length) > 0 ? obj.name : "Unnamed");
        let div = HL.createCustomElement("div",
            { "class": "line numbers-array user-tag_default_untaged" },
            graphElement);
        div.appendChild(creatJSONElement(obj.value, HL.createClassName(obj.tags)));
        div.appendChild(tagElement);
        parent.appendChild(div);

        return true;
    }

    // private functions: 

    function convertArrayToGraph(arr){

        let d = [];
        for (let i = 0; i < arr.length; i++){
            d.push({"key" : i, "value" : arr[i]});
        }

        return d;
    }

    function displayGraph(data, title){
        let newElement = document.createElement("div");
        //mainContent.appendChild(newElement);
        MG.data_graphic({
            title: title,
            data: data,
            width: 650,
            height: 350,
            target: newElement,
            x_accessor: 'key',
            y_accessor: 'value',
        })
        return newElement;
    }


    function displayBarGraph(data, title){

        let newElement = document.createElement("div");
        mainContent.appendChild(newElement);
        MG.data_graphic({
            title: title,
            data: data,
            width: 650,
            height: 350,
            target: newElement,
            x_accessor: 'key',
            y_accessor: 'value',
            chart_type: 'bar',
            //bar_orientation: 'vertical',
        })
    }

    function displayHistogram(data){

        let newElement = document.createElement("div");
        mainContent.appendChild(newElement);
        MG.data_graphic({
            title: "Histogram",
            data: data,
            width: 650,
            height: 350,
            target: newElement,
            x_accessor: 'key',
            y_accessor: 'value',
            chart_type: 'histogram',
            //bar_margin: 0,
            bins: data.length,
            //right: 10,
        })
    }

    return exports;

})();
