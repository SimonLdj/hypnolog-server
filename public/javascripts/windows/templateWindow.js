// This is a template for Window.
//
// Window responsible for displaying a stream of logged data.
// Each window can have its own logic for displaying the data and it is not
// obligated to display all the given data. For example some window can display
// each data in new line, but other window can display only the last logged
// data. Each window can use any visualizers it desire.
// Window differ from a Visualizers in a sense visualizers responsible to
// display single HypnoLog-data obejct, while window responsible to display as
// many object as it desire, in any way it desire (for example, it can display
// each object using TextVisualier, one under the other).
//
// Window must implement those methods:
//
// createWindowElement(callback) : void
//  Create DOM element which represent the Window. This element will be added
//  to windows container by the WindowsDispatcher.
//  callback - function to call when DOM element is ready. First argument is
//  the newly created DOM element.
//
// display(obj) : void
//  Display the given HypnoLog-object. Window is not obligated to display the
//  received data, so it is up to its logic.
//  obj - HypnoLog object to display.
//

'use strict';
define(function (require) {

    let exports = {};

    // DOM element which will hold all other elements.
    // Will be created when createWindowElement method called
    let mainContainerEl = null;

    // public functions:

    exports.createWindowElement = function(callback) {
        // TODO: replace this with your own logic

        // create <div class="window"></div>
        // set it as main container
        mainContainerEl = document.createElement("div");
        mainContainerEl.classList.add("window");

        // pass the new DOM element to one who called us
        callback(mainContainerEl);
    }

    exports.display = function(data) {
        // TODO: replace this with your own logic

        DefaultVisualizer.display(data, function(element) {
            // append the newly created element to main container
            mainContainerEl.appendChild(element);
        });
    }

    return exports;

});
