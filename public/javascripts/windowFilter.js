// Enhance window with filtering capabilities
//
// TODO: refactor WindowFilter to have no Initialize method.
// Also think about better way to separate UI and logic,
// don't assume some DOM elements already exist.
// Also, WindowFilter should be detached from specific window.
'use strict';
define(function (require) {

    let exports = {};

    // private properties:

    // Keep all tags as {string, boolean} array
    let tags = {};
    // Style Element add to the document
    let styleEl;
    // style sheet of the style element
    let styleSheet;
    // hold DOM element of the filter menu
    let filterEl;

    // public functions:

    // Initialize variables in WindowFilter.
    // It is mandatory to call this function, after the DOM is loaded and before using WindowFilter.
    exports.initialize = function() {
        // initializer styleEl and styleSheet variables
        // create style element and add it to document
        styleEl = document.createElement('style');
        styleEl.type = 'text/css';
        document.head.appendChild(styleEl);
        styleSheet = styleEl.sheet;

        // set filter element
        filterEl = document.getElementById("filter");

        // assume there are already 'All' and 'Untaged' checkbox DOM elements

        // add "Untaged" option, assume it's in DOM already
        tags["untaged"] = {name: "untaged", display: true};

        // bind on click event to all existing checkbox DOM element
        let existingCheckboxs = filterEl.querySelectorAll("input[type=checkbox]");
        for (let i = 0; i < existingCheckboxs.length; i++) {
           existingCheckboxs[i].addEventListener('click', exports.handleCheckboxClick);
        }
    }

    // in: array of strings represent tags
    // add (only new) tags to the filter
    exports.addTags = function(tagsArray) {

        for (let i = 0; i < tagsArray.length; i++) {
            let tag = tagsArray[i];
            // if tag is not a string, continue
            if (typeof tag !== 'string') continue;
            // if tag already exist, continue
            if (typeof tags[tag] !== 'undefined') continue;

            // tag doesn't exit, add it
            createNewTag(tag);
            //tags[tag] = {name: tag, display: true};
        }
    }

    exports.getAllTags = function() {
        return tags.map(x => x.name);
    }

    // Invoke when a checkbox DOM element clicked (checked/unchecked)
    // Identify tag by the 'name' attribute of the checkbox.
    // Note: name="*" used for "All" checkbox
    exports.handleCheckboxClick = function(event) {
        let checkbox = event.currentTarget;
        let name = checkbox.name;

        // special case for "all" option
        if (name === "*") {
            toogleAllCheckbox(checkbox.checked);
            return;
        } 

        tags[name].display = checkbox.checked;
        updateCssRules();
        updateAllCheckbox();
    }

    // private functions:

    // Create new tag, add checkbox to the DOM, and to the inner collection
    function createNewTag(tagName){

        // add tag to the inner collection
        tags[tagName] = {name: tagName, display: true};

        // add checkbox to DOM
        let checkboxEl = document.createElement("input");
        checkboxEl.setAttribute("type", "checkbox");
        checkboxEl.setAttribute("id", "filterOption-"+tagName);
        checkboxEl.setAttribute("name", tagName);
        checkboxEl.addEventListener('click', exports.handleCheckboxClick);
        checkboxEl.checked = true;
        filterEl.appendChild(checkboxEl);

        // add label for the checkbox to DOM
        let labelEl = document.createElement("label");
        labelEl.setAttribute("for", "filterOption-"+tagName);
        labelEl.appendChild(document.createTextNode("#" + tagName));
        filterEl.appendChild(labelEl);
    }


    // Update Css rules in the inner style sheet
    // according to the checkboxs
    function updateCssRules() {
        // delete all CSS rules
        while (styleSheet.cssRules.length != 0)
            styleSheet.deleteRule(0);

        // hide all lines
        addCssRule(".window .line", "display: none;");

        // show all un-hidden tags by adding rules
        for(let tag in tags) {
            if (tags[tag].display === true)
                addCssRule(".window .line.user-tag_" + tag, "display: block;");
        }
    }

    // Add CSS rules to style sheet
    function addCssRule(name, rule) {
        // add rule at the end of the style sheet
        let max = styleSheet.cssRules.length - 1;
        max  = max < 0 ? 0 : max;
        styleSheet.insertRule(name + " {" + rule + "}", max);
    }

    // turn on all checkboxs (display all tags)
    // or turn off all.
    // Implement by invoking click() on the checkboxs.
    function toogleAllCheckbox(isOn){

        let allCheckboxElements = filterEl.querySelectorAll("input[type=checkbox]");

        // go over all checkboxs elements
        for (let i = 1; i < allCheckboxElements.length; i++){
            let element = allCheckboxElements[i];

            // if current checkbox not in the same state as the all-checkbox, toogle it
            if (element.checked !== isOn) {
                element.click();
            }
        }
    }

    // Update the "All" checkbox status (check/unchecked)
    // according to the other checkboxs status
    function updateAllCheckbox(){
        // number of checkboxs which are not-checked and not the "all" checkbox (identified as with name="*")
        let countUnchacked = filterEl.querySelectorAll("input[type=checkbox]:not(:checked):not([name='*'])").length;

        // set all checkbox as checked, only if there are zero other unchecked checkboxs
        filterEl.querySelector("input[type=checkbox][name='*']").checked = (countUnchacked === 0);
    }

    return exports;

});
