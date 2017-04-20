// Utilities for creating DOM elements
'use strict';
let HL = (function() {

    let exports = {};

    // public functions:

    exports.converTagsArrayToString = function(tagsArray) {
        if (!tagsArray || tagsArray.length < 1)
            return "";

        return "#" + tagsArray.join(" #");
    }

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

    exports.creatNameElement = function(name) {
        let nameElement = exports.createCustomElement("span", { "class": "variable-name" }, null);
        nameElement.innerHTML = name + " :";
        return nameElement;
    }

    exports.createClass = function(name, rule) {
        let style = document.createElement('style');
        style.type = 'text/css';
        document.getElementsByTagName('head')[0].appendChild(style);
        if (!(style.sheet || {}).insertRule)
            (style.styleSheet || style.sheet).addRule(name, rule);
        else
            style.sheet.insertRule(name + "{" + rule + "}", 0);
    }


    // private functions:
    // none
    
    return exports;

})();
