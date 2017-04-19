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

        let tagElement = createCustomElement("div", { "class": "tagElement" },
            document.createTextNode(converTagsArrayToString(obj.tags || [])));

        // TODO: display type for array
        let gData = convertArrayToGraph(obj.value);

        let graphElement = displayGraph(gData,
                     (obj.name && obj.name.length) > 0 ? obj.name : "Unnamed");
        let div = createCustomElement("div",
            { "class": "line numbers-array user-tag_default_untaged" },
            graphElement);
        div.appendChild(creatJSONElement(obj.value, createClassName(obj.tags)));
        div.appendChild(tagElement);
        parent.appendChild(div);

        return true;
    }

    // private functions: 
    // TODO: re-write methods such as createCustomElement, converTagsArrayToString
    //       use some Utils for tags displaying as this should be shared code for Visualizers
    //       Also delete some uneeded prviate methods

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

    function createCustomElement(elementType, attributesDic, content) {
        var element = document.createElement(elementType);
        for (var attribute in attributesDic) {
            var attributeNode = document.createAttribute(attribute);
            attributeNode.value = attributesDic[attribute];
            element.setAttributeNode(attributeNode);
        }
        if (content)
            element.appendChild(content);
        return element;
    }

    function converTagsArrayToString(tagsArray) {
        if (!tagsArray || tagsArray.length < 1)
            return "";

        return "#" + tagsArray.join(" #");
    }


    return exports;

})();
