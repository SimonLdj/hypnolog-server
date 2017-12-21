// TODO: Document
// TODO: create template window
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
    HL.visualizersDispatcher.add(SimpleTypeVisualizer);
    HL.visualizersDispatcher.add(DefaultVisualizer);

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

    exports.display = function(data, callback){

        // Add tags to window filter
        if (data.tags && data.tags.length > 0)
            WindowFilter.addTags(data.tags);

        // find visualizer to create DOM element to visualize the data
        HL.visualizersDispatcher.visualize(data, function(element) {
            // append the newly created element to main container
            mainContainerEl.appendChild(element);
        });

        // scroll container to bottom (to simulate console scrolling)
        mainContainerEl.scrollTop = mainContainerEl.scrollHeight;
    }

    return exports;

})();
