// Create a map object
var myMap = L.map("map", {
  center: [37.09, -95.71],
  zoom: 5
});

// Add a tile layer to the map
L.tileLayer(
    "https://api.mapbox.com/styles/v1/mapbox/outdoors-v10/tiles/256/{z}/{x}/{y}?" +
      "access_token=pk.eyJ1Ijoia2pnMzEwIiwiYSI6ImNpdGRjbWhxdjAwNG0yb3A5b21jOXluZTUifQ." +
      "T6YbdDixkOBWH_k9GbS8JQ"
  ).addTo(myMap);

// City markers

// Add code to create a marker for each city below and add it to the map

// newyork;
// chicago;
// houston;
// la;
// omaha;
