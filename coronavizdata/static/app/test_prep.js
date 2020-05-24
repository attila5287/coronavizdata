let coordByName = {},
    abCodeByName = {},
    popByName = {};

testdata.locations.forEach(d => { 
  const name = d.country;
  coordByName[name] = d.coordinates;
  popByName[name] = +d.country_population;
  abCodeByName[name] = d.country_code;
}) 


console.log('coordByName:',coordByName);
// console.log('popByName :>> ', popByName);

const groupedByDeaths = d3.nest()
  .key(function(d) { return d.country; })
  .rollup(function(v) { return d3.sum(v, function(d) { return d.latest.deaths; }); })
  .entries(testdata.locations);
  // console.log('groupedByDeaths :>> ', groupedByDeaths.length);

const names = groupedByDeaths.map((d) => d.key);
// console.log('names :>> ', names);

const groupedByConfirmed = d3.nest()
  .key(function(d) { return d.country; })
  .rollup(function(v) { return d3.sum(v, function(d) { return d.latest.confirmed; }); })
  .entries(testdata.locations);
// console.log('groupedByConfirmed :>> ', groupedByConfirmed.length);

let deathsByName = {},
    confirmedByName = {};

groupedByDeaths.forEach(d => {
  deathsByName[d.key] = +d.value;
})

groupedByConfirmed.forEach((d) => {
  confirmedByName[d.key] = +d.value;
})

// console.log('deathsByName :>> ', deathsByName);
// console.log('confirmedBy :>> ', confirmedByName);



// quick info: need to generate unique objects with coordinate and figures
// refresh memory: there are 266 entries but only 187 unique country names

const locations = names.map(name => {
  return {
    coordinates: [coordByName[name].latitude, coordByName[name].longitude],
    confirmed: {
      'name': abCodeByName[name],
      'numOfPersons' : confirmedByName[name]
    },
    deaths: {
      'name': name,
      'numOfPersons' : deathsByName[name]
    }
  };
  
})
