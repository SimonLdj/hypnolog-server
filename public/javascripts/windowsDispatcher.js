// TODO: Document WindowsDispatcher
// WindowsDispatcher pass the given Hypnolog data object to all active windows
//
// WindowsDispatcher should get collection of windows to use,
//

'use strict';
// TODO: don't assume HL variable exist
HL.WindowsDispatcher = (function() {

    let exports = {};

    // private properties:
    let windows = [];

    // public functions:

    // Add the given Window
    exports.add = function(w) {
        windows.push(w);
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
