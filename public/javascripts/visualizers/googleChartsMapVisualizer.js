// Visualizer using Google Charts Map
// Can display coordinates (lat-long pairs) or addresses.
// see https://developers.google.com/chart/interactive/docs/gallery/map
//
// Display types:
//  "googlemaps", "google-maps"
//
// Data example:
//    [
//        ['Lat', 'Long', 'Name'],
//        [37.4232, -122.0853, 'Work'],
//        [37.4289, -122.1697, 'University'],
//        [37.6153, -122.3900, 'Airport'],
//        [37.4422, -122.1731, 'Shopping']
//    ]
//
'use strict';
define(function (require) {

    // TODO: load dependencies
    //SystemJS.import('https://www.gstatic.com/charts/loader.js');

    let displayTypes = ["googlemaps", "google-maps"];
    let exports = {};

    // Call Google charts API to load and display the map
    // Note: Google maps require API key. If you get 'MissingKeyMapError' thats key related error.
    // see https://developers.google.com/maps/documentation/javascript/get-api-key
    google.charts.load('current', { 'packages': ['map'], 'mapsApiKey': 'AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY' });

    // Note, we should somehow make sure google charts were loaded before we use them
    //google.charts.setOnLoadCallback(function() { console.log("done loading google charts") });


    // public functions:

    exports.canDisplay = function(obj){
        // Check if we support given object type
        if (displayTypes.some(s => s === obj.type.toLocaleLowerCase()))
            return true;
        return false;
    }

    exports.display = function(obj, callback){
        // return false if we can not visualize the object
        if (!exports.canDisplay(obj))
            return false;


        // create div element to contain all
        let element = document.createElement("div");

        // create another div to contain the map, this solve some issues when
        // adding variable name or tags
        let mapElement = document.createElement("div");
        mapElement.style = "width: 800px; height: 400px;";

        // convert data to Google's DataTable, and create the map element
        var dataTable = google.visualization.arrayToDataTable(obj.data);
        var map = new google.visualization.Map(mapElement);
        map.draw(dataTable, {
            showTooltip: true,
            showInfoWindow: true,
            width: 800,
            height: 400
        });
        element.appendChild(mapElement);

        // pass the new element to the callback
        callback(element);

        // return true, as yes, visualization was done successfully
        return true;
    }

    return exports;

});
