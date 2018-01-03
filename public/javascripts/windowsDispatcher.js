// WindowsDispatcher responsible for distributing the logged data to all its windows.
//
// WindowsDispatcher hold a collection of windows which are in use and pass the logger data to ALL of the windows.
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

    // Set the DOM element which should contain all of the windows 
    // TODO: refactor WindowsDispatcher to receive container element from constructor
    exports.setContainer = function(element) {
        containerElement = element;
    }

    // Add the given Window to windows collection
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

    // Display the given data using the windows.
    // Will pass the given data to all of the windows to display the data.
    // data - Hypnolog data object to display
    exports.display = function(data) {

        // remember if at least one window was found to display the data
        let atLeastOne = false;

        // pass the data object to all windows
        windows.forEach(function(w) {
            atLeastOne = true;
            w.display(data);
        });

        if (atLeastOne == false) {
            // warn user in case no windows to display data were found
            console.warn("WindowsDispatcher couldn't find even one window to display the data. Use `WindowsDispatcher.add` to add windows.");
            console.dir(data);
        }
    }

    // private functions:
    // none
    
    return exports;

})();
