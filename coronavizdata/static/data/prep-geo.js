
// latestTimeSeries();

var allJSON = testdata.locations.map((d) => {
  return {
  name: d.country,
  lat: +d.coordinates.latitude, 
  lon: +d.coordinates.longitude, 
  pop: +d.country_population, 
  };
});

// console.log('allJSON :>> ', allJSON);

// const cities = [
//   {
//     location: [40.7128, -74.0059],
//     name: "New York",
//     population: 8550405
//   },
//   {
//     location: [41.8781, -87.6298],
//     name: "Chicago",
//     population: 2720546
//   },
//   {
//     location: [29.7604, -95.3698],
//     name: "Houston",
//     population: 2296224
//   },
//   {
//     location: [34.0522, -118.2437],
//     name: "Los Angeles",
//     population: 3971883
//   },
//   {
//     location: [41.2524, -95.9980],
//     name: "Omaha",
//     population: 446599
//   }
// ];

// console.log(testdata);
// coordinates: Object { latitude: "33.0", longitude: "65.0" }
// country: "Afghanistan"
// country_code: "AF"
// country_population: 37172386

var allJSON = testdata.locations.map((d) => {
  return {
    location: [
      +d.coordinates.latitude,  
      +d.coordinates.longitude, 
    ],
    name: d.country,
  population: +d.country_population, 
  };
});
cities = allJSON;
// console.log('cities :>> ', cities);



