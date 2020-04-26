
function worldMapUp(data, chosenId) {
  console.log(' --- Data for Map --- ');
  var chosenCountry = data.locations[chosenId];
  var countryList = [];
  var populationList = [];
  var deathsList = [];
  var confirmedList = [];
  var latList = [];
  var lonList = [];
  

  var countryIds = [chosenId, 225, 137, 201];

  countryIds.forEach(id => {
    countryList.push(data.locations[id].country);
    latList.push(data.locations[id].coordinates.latitude);
    lonList.push(data.locations[id].coordinates.longitude);
    populationList.push(data.locations[id].country_population);
    deathsList.push(data.locations[id].latest.deaths);
    confirmedList.push(data.locations[id].latest.confirmed);
  });

  let chinaName = 'China',
     chinaPop = data.locations[49].country_population,
      chinaLat = data.locations[49].coordinates.latitude,
      chinaLon = data.locations[49].coordinates.longitude,
      chinaDeaths = 0,
      chinaConfirmed = 0,
      countrySize = [],
      hoverText = [],
      scale = 500;

  // sum all 33 provinces of China for death-confirmed total
  for (let id = 49; id <= 81; id += 1) {
    const province = data.locations[id];
    chinaDeaths += province.latest.deaths;
    chinaConfirmed += province.latest.confirmed;
  }

  countryList.push(chinaName);
  deathsList.push(chinaDeaths);
  populationList.push(chinaPop);
  confirmedList.push(chinaConfirmed);
  latList.push(chinaLat);
  lonList.push(chinaLon);


    for ( var i = 0 ; i < populationList.length; i += 1) {
        var currentSize = deathsList[i] / scale;
        var currentText = countryList[i] + " deaths: " + deathsList[i];
        countrySize.push(currentSize);
        hoverText.push(currentText);
    }

    var data = [{
        type: 'scattergeo',
        locationmode: 'ISO-3',
        lat: latList,
        lon: lonList,
        hoverinfo: 'text',
        text: hoverText,
        marker: {
            size: countrySize,
            line: {
                color: 'black',
                width: 2
            },
        }
    }];

    var layout = {
    plot_bgcolor: "#002B36",
    paper_bgcolor: "#002B36",
    responsive: true,
    showgrid: true,
    showlegend:true,
    font: {
      color: '#B58900',
    },
    margin: {
      t: 25,
      r: 5,
      l: 5,
      b: 5
    },
    legend: {
      font: {
        color: '#B58900'
      }
    },
    title: `${chosenCountryName} vs. US, China, Italy, Spain in Deaths`,
    showlegend: true,
    geo: {
        scope: 'world',
        showland: true,
        landcolor: '#B58900',
        subunitwidth: 1,
        countrywidth: 1,
        subunitcolor: '#073642',
        countrycolor: '#002B36'
        },
    };

    Plotly.newPlot("myDiv", data, layout, {showLink: false});

}
