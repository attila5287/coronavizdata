// Load data from hours-of-tv-watched.csv
d3.csv("./hours-of-tv-watched.csv", function(error, tvData) {
  if (error) return console.warn(error);

  console.log(tvData);

  // log a list of names
  var names = tvData.map(data => data.name);
  console.log("names", names);

  // Cast the hours value to a number for each piece of tvData
  tvData.forEach(function(data) {
    data.hours = +data.hours;
    console.log("Name:", data.name);
    console.log("Hours:", data.hours);
  });
});
