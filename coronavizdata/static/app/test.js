
// Function to determine marker size based on numOfPersons
function markerSize(numOfPersons) {
  return numOfPersons*1.5;
}

// Define arrays to hold created city and state markers
var deathsMarkers = [];
var confirmedMarkers = [];

// Loop through locations and create city and state markers
for (var i = 0; i < locations.length; i++) {
  // Setting the marker radius for the state by passing numOfPersons into the markerSize function
  confirmedMarkers.push(
    L.circle(locations[i].coordinates, {
      stroke: false,
      fillOpacity: 0.75,
      color: "white",
      fillColor: "white",
      radius: markerSize(locations[i].confirmed.numOfPersons)
    })
  );

  // Setting the marker radius for the city by passing numOfPersons into the markerSize function
  deathsMarkers.push(
    L.circle(locations[i].coordinates, {
      stroke: false,
      fillOpacity: 0.75,
      color: "purple",
      fillColor: "purple",
      radius: markerSize(locations[i].deaths.numOfPersons)
    })
  );
}
var darkmap = L.tileLayer(
  "https://api.mapbox.com/styles/v1/mapbox/dark-v9/tiles/256/{z}/{x}/{y}?" +
    "access_token=pk.eyJ1IjoiYXR0aWxhNTIiLCJhIjoiY2thOTE3N3l0MDZmczJxcjl6dzZoNDJsbiJ9.bzXjw1xzQcsIhjB_YoAuEw"
);

// Define variables for our base layers
var streetmap = L.tileLayer(
  "https://api.mapbox.com/styles/v1/mapbox/outdoors-v10/tiles/256/{z}/{x}/{y}?" +
    "access_token=pk.eyJ1IjoiYXR0aWxhNTIiLCJhIjoiY2thOTE3N3l0MDZmczJxcjl6dzZoNDJsbiJ9.bzXjw1xzQcsIhjB_YoAuEw"
);

// Create two separate layer groups: one for deaths and one for states
var confirmed = L.layerGroup(confirmedMarkers);
var deaths = L.layerGroup(deathsMarkers);

// Create a baseMaps object
var baseMaps = {
  "Dark Map": darkmap,
  "Street Map": streetmap,
};

// Create an overlay object
var overlayMaps = {
  "Confirmed Cases": confirmed,
  "Deaths": deaths
};

// Define a map object
var myMap = L.map("map", {
  center: [37.09, -95.71],
  zoom: 3,
  layers: [darkmap, confirmed, deaths]
});

// Pass our map layers into our layer control
// Add the layer control to the map
L.control.layers(baseMaps, overlayMaps, {
  collapsed: false
}).addTo(myMap);
