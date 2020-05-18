
// Create our initial map object
// Set the longitude, latitude, and the starting zoom level
var myMap = L.map("map", {
  center: [45.52, -122.67],
  zoom: 13
});

// Add a tile layer (the background map image) to our map
// We use the addTo method to add objects to our map
L.tileLayer(
  "https://api.mapbox.com/styles/v1/mapbox/outdoors-v10/tiles/256/{z}/{x}/{y}?" +
    "access_token=pk.eyJ1IjoiYnVtYmFsb3JkIiwiYSI6ImNqaWNhZ2d1bjAxOHoza3BqcDQzMHR3Z3AifQ.KzBDaZozIdwa38NsQZslfw"
).addTo(myMap);

// Create a new marker
// Pass in some initial options, and then add it to the map using the addTo method
var marker = L.marker([39.71, -105.08], {
  draggable: false,
  title: "My First Marker"
}).addTo(myMap);
console.log(marker);
// Binding a pop-up to our marker
marker.bindPopup("What's Crackin'?!?");
