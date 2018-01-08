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

        // Add tags to window filter
        if (data.tags && data.tags.length > 0)
            WindowFilter.addTags(data.tags);

        // find visualizer to create DOM element to visualize the data
        HL.visualizersDispatcher.visualize(data, function(element) {

            // If data was logged with variable name:
            // append variable name element, if name was given
            let nameElement = HL.createVariableNameElement(data);
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
            let userTagsClass = HL.createTagsClass(data);
            if (userTagsClass.length > 0)
                element.classList.add(...userTagsClass);
            // append tags element, if given
            let tagsElement = HL.createTagsElement(data);
            if (tagsElement)
                element.appendChild(tagsElement);

            // append the newly created element window's to main container
            mainContainerEl.appendChild(element);
        });

        // scroll container to bottom (to simulate console scrolling)
        mainContainerEl.scrollTop = mainContainerEl.scrollHeight;
    }

    return exports;

})();
