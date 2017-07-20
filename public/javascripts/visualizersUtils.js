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

        let tagsString = convertTagsArrayToHashTagString(data.tags || []);
        let element = document.createElement("div");
        element.classList.add("tagElement");
        element.appendChild(document.createTextNode(tagsString));
        return element;
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

    // For given HypnoLog data object create array of string,
    // each string is class name represent user tag, which should be applied on the element.
    // For empty tag list, return default 'untaged' class.
    // This is to allow log filtering.
    // (We filter elements by class, so each class represent tag)
    exports.createTagsClass = function(data) {
        if (!data.tags || data.tags.length < 1)
            return ["user-tag_untaged"];

        return Array.from(data.tags, x => "user-tag_"+x);
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

    // Convert given array of string to single string
    // formated as hash tags: "#tagA #tagB"
    function convertTagsArrayToHashTagString (tagsArray) {
        if (!tagsArray || tagsArray.length < 1)
            return "";

        return "#" + tagsArray.join(" #");
    }

    return exports;

})();