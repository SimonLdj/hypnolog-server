// Visualizer using Google Charts Map
// Can display coordinates (lat-long pairs) or addresses.
// see https://developers.google.com/chart/interactive/docs/gallery/map
//

'use strict';
let GoogleChartsMapVisualizer = (function() {

    let exports = {};

    // Call Google charts API to load and display the map
    // Note: Google maps require API key. If you get 'MissingKeyMapError' thats key related error.
    // see https://developers.google.com/maps/documentation/javascript/get-api-key
    google.charts.load('current', { 'packages': ['map'], 'mapsApiKey': 'AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY' });

    // Note, we should somehow make sure google charts were loaded before we use them
    //google.charts.setOnLoadCallback(function() { console.log("done loading google charts") });


    // public functions:

    exports.canDisplay = function(obj){
        if (obj.type.toLocaleLowerCase() === "coordinate")
            return true;
        return false;
    }

    exports.display = function(obj, callback){
        // return true if we can not visualize the object
        if (!exports.canDisplay(obj))
            return false;


        // create div element to contain all
        let element = document.createElement("div");

        // create another div to contain the map, this solve some issues when
        // adding variable name or tags
        let mapElement = document.createElement("div");

        // convert data to Google's DataTable, and create the map element
        var dataTable = google.visualization.arrayToDataTable(obj.data);
        var map = new google.visualization.Map(mapElement);
        map.draw(dataTable, {
            showTooltip: true,
            showInfoWindow: true
        });
        element.appendChild(mapElement);

        // pass the new element to the callback
        callback(element);

        // return true, as yes, visualization was done successfully
        return true;
    }

    return exports;

})();
