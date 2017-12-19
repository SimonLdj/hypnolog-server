// This is example for Visualizer with state
'use strict';
let StateVisualizer = (function() {

    let exports = {};

    // private properties:
    // TODO: add your own state properties
    let sum = 0;

    // public functions:

    exports.canDisplay = function(obj){
        // TODO: replace this with your own filtering logic
        // visualize only numbers
        let type = obj.type.toLocaleLowerCase();
        if (type === "number"
            || type === "int32"
            || type === "double")
            return true;
        return false;
    }

    exports.display = function(obj, callback){
        // return true if we can not visualize the object
        if (!exports.canDisplay(obj))
            return false;

        // TODO: replace this with your own visualization logic

        // Add each objects value to the sum
        // and add <pre> DOM element displaying the sum
        addToSum(parseFloat(obj.value));
        let element = document.createElement("pre");
        element.appendChild(document.createTextNode("Sum: " + sum));

        // pass the new element to callback
        callback(element);

        // return true, as yes, visualization was done successfully
        return true;
    }

    // private functions:
    
    function addToSum(n){
        sum += n;
    }

    return exports;

})();
