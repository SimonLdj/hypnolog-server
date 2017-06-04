// Utilities for creating DOM elements
'use strict';
let HL = (function() {

    let exports = {};

    // public functions:

    // For given HypnoLog data object create <div> element with
    // objects tags as string (formated as hash tags, to be displayed near the data)
    // If data has no tags, null will be returned
    exports.createTagsElement = function(data){
        if (!data.tags)
            return null;

        let tagsString = HL.converTagsArrayToString(data.tags || []);
        let element = document.createElement("div");
        element.classList.add("tagElement");
        element.appendChild(document.createTextNode(tagsString));
        return element;
    }

    // Convert given array of string to single string
    // formated as hash tags: "#tagA #tagB"
    // TODO: make private (?)
    exports.converTagsArrayToString = function(tagsArray) {
        if (!tagsArray || tagsArray.length < 1)
            return "";

        return "#" + tagsArray.join(" #");
    }

    // For given HypnoLog data object create <span> element with
    // objects name (to be displayed before the data)
    // If data has no variable name, null will be returned.
    exports.createVariableNameElement = function(data) {
        // TODO: use full name if short name is ambiguous, or not given
        if (!data.name)
            return;

        let element = document.createElement("span");
        element.classList.add("variable-name");
        element.appendChild(document.createTextNode(data.name + ":"));
        return element;
    }


    // TODO: rewrite/delete this method
    // TODO: this convert string array to simple string, that not what the name indicates
    // also, this adds 'line' call, this is also not clear from the name
    exports.createClassName = function(stringArray) {
        if (stringArray) {
            if (stringArray.length == 1)
                return "line user-tag_" + stringArray.toString();
            let name = stringArray.toString();
            return "line " + name.replace(/\,/g, " user-tag_");
        }
        return null;
    }

    // TODO: rewrite/delete this method
    exports.createCustomElement = function(elementType, attributesDic, content) {
        let element = document.createElement(elementType);
        for (let attribute in attributesDic) {
            let attributeNode = document.createAttribute(attribute);
            attributeNode.value = attributesDic[attribute];
            element.setAttributeNode(attributeNode);
        }
        if (content)
            element.appendChild(content);
        return element;
    }

    // private functions:
    // none
    
    return exports;

})();
