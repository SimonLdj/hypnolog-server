// DefaultWindow is the default window to display data in Hypnolog.
// It acts like a console displaying each logged data line after line,
// scrolling down to the latest logged line.
// It use few visualizers to display the data: NewSessionVisualizer,
// GraphVisualizer, SimpleTypeVisualizer, DefaultVisualizer.
// It has a tags filter which can filter logged lines by the attached tag.
//
'use strict';
define(function (require) {

    // import
    let VisualizersDispatcher = require('javascripts/visualizersDispatcher.js');
    let WindowFilter = require('javascripts/windowFilter.js');
    let Config = require('./../configFactory.js');

    // Private members
    var dispatcher = new VisualizersDispatcher();
    var lineNumberCounter = 0;

    // DOM element which will hold all other elements.
    // Will be created when createWindowElement method called
    let mainContainerEl = null;

    // public functions:
    let exports = {};

    exports.initialize = function() {

        // TODO: better design for WindowFilter - not global, create instance. Call it TagsFilter?
        // initialize window filter
        WindowFilter.initialize();


        // load visualizers dynamically according to the configuration
        Config.getVisualizers()
        .then(visualizers => {
            // Note, visualizers order does matters!
            // The first suitable visualizer which will be found, will be used
            // so, most specific come first, most general at last.
            return dispatcher.add(...Object.values(visualizers));
        })
        .then(r => {
            // TODO: show some UI indication while visualizers still loading, and when done.
            console.log("Done loading Visualizers");
        });
    }

    exports.createWindowElement = function(callback) {
        // TODO: rename class ti .defaultWindow
        // create <div class="window"></div>
        // set it as main container
        mainContainerEl = document.createElement("div");
        mainContainerEl.classList.add("window");

        // pass the new DOM element to one who called us
        callback(mainContainerEl);
    }

    exports.display = function(data) {

        // TODO: check data.tags validity
        // Now we assume tags are array of string, but we should validate it, as this is user input.
        // (or: validate it using JSON schema, as we already do)

        // Add tags to window filter
        if (data.tags && data.tags.length > 0)
            WindowFilter.addTags(data.tags);

        // let dispatcher find visualizer to create DOM element to visualize the data
        dispatcher.visualize(data, function(visualizerEl) {
            // callback for when visualizer created its element

            // Create element represent log line in the window
            let lineEl = document.createElement("div");

            // add the newly created element by the visualizer to the line-element
            lineEl.appendChild(visualizerEl);

            // For Tag filtering: add "line" CSS class to all elements in Default window
            // This will make the Tag filter (WindowFilter) effect the element when filtering
            // TODO: decide, is new-session info is also a line in a window
            // Note: "new-session" element are not also filtered by the tag-filtering mechanism.
            // If we want to avoid it, we should not add the "line" CSS class to them,
            // or re-think how the tag filter should work.
            lineEl.classList.add("line");

            // If data was logged with variable name:
            // append variable name element as first element in the line-element
            let nameElement = createVariableNameElement(data);
            if (nameElement) lineEl.prepend(nameElement);

            // If data was logged with tags:
            // Add CSS class to element according to given tags.
            // This is to allow log filtering with Window filter
            // (We filter elements by CSS class, so each class represent tag)
            let userTagsClass = createTagsClass(data);
            if (userTagsClass.length > 0)
                lineEl.classList.add(...userTagsClass);
            // append tags element, if given
            let tagsElement = createTagsElement(data);
            if (tagsElement)
                lineEl.appendChild(tagsElement);

            // line number
            lineEl.appendChild(createLineNumberElement());

            // check if window was scrolled to bottom, before adding the new element
            var bodyElement = document.getElementsByTagName("BODY")[0];
            let scrollNearBottom = (bodyElement.scrollHeight - bodyElement.scrollTop -
                                    bodyElement.clientHeight < 50);

            // append the newly created element window's to main container
            mainContainerEl.appendChild(lineEl);

            // if window was scrolled to bottom, keep scrolling it down.
            if (scrollNearBottom) {
                // scroll container to bottom (to simulate console scrolling)
                bodyElement.scrollTop = bodyElement.scrollHeight;
            }
        });
    }

    // private functions:

    // For given HypnoLog data object create <div> element with
    // objects tags as string (formated as hash tags, to be displayed near the data)
    // If data has no tags, null will be returned
    function createTagsElement(data){
        if (!data.tags)
            return null;

        let containerElement = document.createElement("div");
        containerElement.classList.add("tagsElementContainer");

        let tags = data.tags || [];
        for (let i = 0; i < tags.length; i++) {
            let tagElement = document.createElement("div");
            tagElement.classList.add("tagElement");
            let tagString = "#"+tags[i];
            tagElement.appendChild(document.createTextNode(tagString));
            containerElement.appendChild(tagElement);
        }

        return containerElement;
    }

    // For given HypnoLog data object create <span> element with
    // objects name (to be displayed before the data)
    // If data has no variable name, null will be returned.
    function createVariableNameElement(data) {
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
    function createTagsClass(data) {
        if (!data.tags || data.tags.length < 1)
            return ["user-tag_untaged"];

        return Array.from(data.tags, x => "user-tag_"+x);
    }

    function createLineNumberElement() {
        lineNumberCounter++;
        let element = document.createElement("span");
        element.classList.add("lineNumber");
        element.appendChild(document.createTextNode(lineNumberCounter));
        return element;
    }

    return exports;

});
