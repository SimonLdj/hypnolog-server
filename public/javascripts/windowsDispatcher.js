// TODO: Document WindowsDispatcher
// WindowsDispatcher pass the given Hypnolog data object to all active windows
//
// WindowsDispatcher should get collection of windows to use,
//
// TODO: Refactor WindowsDispatcher to be one you can create, as like new WindowsDispatcher(..)
//       Then pass the container DOM element in constructor - this will avoid by design calling
//       add method for adding windows before container was set.
//

'use strict';
// TODO: don't assume HL variable exist
HL.WindowsDispatcher = (function() {

    let exports = {};

    // private properties:

    // collection of all windows
    let windows = [];

    // DOM element witch should hold all the windows. This element should be
    // set with setContainer method before adding any windows.
    let containerElement = null;

    // public functions:

    // TODO: document
    exports.setContainer = function(element) {
        containerElement = element;
    }

    // Add the given Window
    exports.add = function(w) {
        // TODO: verify somehow w is a `window` object

        // add new window to windows collection
        windows.push(w);

        // let the window create its DOM element
        w.createWindowElement(function(windowEl) {
            // add the created DOM element to DOM
            containerElement.appendChild(windowEl);
        });
    }

    // data - Hypnolog data object to display
    exports.display = function(data) {
        // pass the data object to all windows
        windows.forEach(function(w) {
            return w.display(data);
        });
    }

    // private functions:
    // none
    
    return exports;

})();
