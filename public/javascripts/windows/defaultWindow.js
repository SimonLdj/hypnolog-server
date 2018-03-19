// DefaultWindow is the default window to display data in Hypnolog.
// It acts like a console displaying each logged data line after line,
// scrolling down to the latest logged line.
// It use few visualizers to display the data: NewSessionVisualizer,
// GraphVisualizer, SimpleTypeVisualizer, DefaultVisualizer.
// It has a tags filter which can filter logged lines by the attached tag.
//

'use strict';
let DefaultWindow = (function() {

    let exports = {};

    // TODO: better design for WindowFilter - not global, create instance. Call it TagsFilter?
    // initialize window filter
    WindowFilter.initialize();

    // TODO: use specific visualizer dispatcher for this window
    //let visualizerDispatcher = new VisualizersDispatcher();
    // Set visualizers to use
    HL.visualizersDispatcher.add(NewSessionVisualizer);
    HL.visualizersDispatcher.add(GraphVisualizer);
    HL.visualizersDispatcher.add(Plotly2dHeatmapsVisualizer);
    HL.visualizersDispatcher.add(GoogleChartsMapVisualizer);
    HL.visualizersDispatcher.add(SimpleTypeVisualizer);
    HL.visualizersDispatcher.add(DefaultVisualizer);

    // DOM element which will hold all other elements.
    // Will be created when createWindowElement method called
    let mainContainerEl = null;

    // public functions:

    exports.createWindowElement = function(callback) {
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

        // Add tags to window filter
        if (data.tags && data.tags.length > 0)
            WindowFilter.addTags(data.tags);

        // find visualizer to create DOM element to visualize the data
        HL.visualizersDispatcher.visualize(data, function(element) {

            // If data was logged with variable name:
            // append variable name element, if name was given
            let nameElement = createVariableNameElement(data);
            if (nameElement) element.prepend(nameElement);

            // For Tag filtering: add "line" CSS class to all elements in Default window
            // This will make the Tag filter (WindowFilter) effect the element when filtering
            // TODO: decide, is new-session info is also a line in a window
            // Note: "new-session" element are not also filtered by the tag-filtering mechanism.
            // If we want to avoid it, we should not add the "line" CSS class to them,
            // or re-think how the tag filter should work.
            element.classList.add("line");

            // If data was logged with tags:
            // Add CSS class to element according to given tags.
            // This is to allow log filtering with Window filter
            // (We filter elements by CSS class, so each class represent tag)
            let userTagsClass = createTagsClass(data);
            if (userTagsClass.length > 0)
                element.classList.add(...userTagsClass);
            // append tags element, if given
            let tagsElement = createTagsElement(data);
            if (tagsElement)
                element.appendChild(tagsElement);

            // append the newly created element window's to main container
            mainContainerEl.appendChild(element);
        });

        // scroll container to bottom (to simulate console scrolling)
        mainContainerEl.scrollTop = mainContainerEl.scrollHeight;
    }

    // private functions:

    // For given HypnoLog data object create <div> element with
    // objects tags as string (formated as hash tags, to be displayed near the data)
    // If data has no tags, null will be returned
    function createTagsElement(data){
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

    // Convert given array of string to single string
    // formated as hash tags: "#tagA #tagB"
    function convertTagsArrayToHashTagString (tagsArray) {
        if (!tagsArray || tagsArray.length < 1)
            return "";

        return "#" + tagsArray.join(" #");
    }

    return exports;

})();
