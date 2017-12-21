// TODO: Document
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

    // TODO: don't assume DOM exist for this window
    let mainContent = document.getElementById("mainOutput");

    // public functions:

    exports.display = function(data, callback){

        // Add tags to window filter
        if (data.tags && data.tags.length > 0)
            WindowFilter.addTags(data.tags);

        // display data using visualizers
        HL.visualizersDispatcher.visualize(data, function(element) {
            mainContent.appendChild(element);
        });

        mainContent.scrollTop = mainContent.scrollHeight;
    }

    return exports;

})();
