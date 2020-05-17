console.log('hello friend! leaflet-bubble-js test');
const format = d3.format( ',' );
const mapBoxAcctToken= 'pk.eyJ1IjoiYXR0aWxhNTIiLCJhIjoiY2thOTE3N3l0MDZmczJxcjl6dzZoNDJsbiJ9.bzXjw1xzQcsIhjB_YoAuEw';

var mapBox = `https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/256/{z}/{x}/{y}?access_token=${mapBoxAcctToken}`;

// Create a map object
var myMap = L.map("map", {
  center: [37.09, -95.71],
  zoom: 5
});

// Add a tile layer
L.tileLayer(mapBox).addTo(myMap);

// Our marker size function that will give each city a different radius based on its population
function markerSize(population) {
  return population *0.0015;
}
 
// for (var i = 0; i < cities.length; i++) {
//   L.circle(cities[i].location, {
//     fillOpacity: 0.75,
//     color: "red",
//     fillColor: "orange",
//     // Setting our circle's radius equal to the output of our markerSize function
//     // This will make our marker's size proportionate to its population
//     radius: markerSize(cities[i].population)
//   }).bindPopup("<h1>" + cities[i].name + "</h1> <hr> <h3>Population: " + cities[i].population + "</h3>").addTo(myMap);
// }
// name: "New York",
// population: 8550405
    // location: [40.7128, -74.0059],
  cities.forEach(city => {
  L.circle(city.location,{
    fillOpacity: 0.25,
    color: "#002B36",
    fillColor: "#2AA198",
    radius: markerSize(city.population)
  }).bindPopup(`<h1>${city.name}</h1><hr><h3>Population:${city.population}</h3>`).addTo(myMap);
})
