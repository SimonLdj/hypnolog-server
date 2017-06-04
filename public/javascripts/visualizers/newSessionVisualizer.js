// New Session message visualizers
// Display title for new session message
'use strict';
let NewSessionVisualizer = (function() {

    let exports = {};

    // public functions:

    exports.canDisplay = function(obj){
        if (obj.type.toLocaleLowerCase() === "newsession")
            return true;
        return false;
    }

    exports.display = function(obj, parent){
        // return true if we can not visualize the object
        if (!exports.canDisplay(obj))
            return false;

        // TODO: decide, is new-session info is also a line in a window
        var header = HL.createCustomElement("h3", { "id": "sectionHeader" }, null);
        header.innerHTML = "Session " + obj.value;
        var hr = document.createElement("hr");
        parent.appendChild(hr);
        parent.appendChild(header);

        // return true, as yes, we can visualize the object
        return true;
    }

    return exports;

})();
