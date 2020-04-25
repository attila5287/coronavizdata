/* eslint-disable no-undef */
// user will select country from Select element thus the dynamic dashboard update
const $countrySelect = document.getElementById('opts');
let defaultId = 213; // turkey country code as initial value

fetchLatestData();

function fetchLatestData() {
  const url = 'https://coronavirus-tracker-api.herokuapp.com/v2/locations';
  d3.json(url, (error, data) => {
    if (error) {
      throw error;
    }
    // initial part here
    overallCountUp(data);
    selectOptionsUp(data);
    chosenFiguresUp(data, defaultId);
    chosenGaugeUp(data, defaultId);
    chosenBubbleUp(data, defaultId);
    chosenPieUp(data, defaultId);

    // dynamic part here
    d3.select('#opts')
      .on('change', function () {
        let chosenId = eval(d3.select(this).property('value'));
        chosenFiguresUp(data, chosenId);
        chosenGaugeUp(data, chosenId);
        chosenBubbleUp(data, chosenId);
        chosenPieUp(data, chosenId);
      });

  });
}


function chosenPieUp(data, chosenId) {
console.log(' --- Data for Pie --- ');
  let countryIdsPie = [];
  let countryListPie = [];
  let deathsListPie = [];
  let confirmedListPie = [];

  chosenCountry = data.locations[chosenId];
  chosenCountryName = chosenCountry.country;
  console.log(chosenCountryName);

  countryIdsPie = [chosenId, 225, 137, 201];
  countryIdsPie.forEach(id => {
    countryListPie.push(data.locations[id].country);
    deathsListPie.push(data.locations[id].latest.deaths);
    confirmedListPie.push(data.locations[id].latest.confirmed);
  });

  let chinaName = 'China';
  let chinaDeaths = 0;
  let chinaConfirmed = 0;


  // sum all 33 provinces of China for death-confirmed total
  for (let id = 49; id <= 81; id += 1) {
    const province = data.locations[id];
    chinaDeaths += province.latest.deaths;
    chinaConfirmed += province.latest.confirmed;
  }

  countryListPie.push(chinaName);
  deathsListPie.push(chinaDeaths);
  confirmedListPie.push(chinaConfirmed);

  console.log(countryListPie);
  console.log(deathsListPie);
  console.log(confirmedListPie);

  let totalDeaths = data.latest.deaths;
  let totalConfirmed = data.latest.confirmed;
  
  const displayFiveDeaths = deathsListPie.reduce( (sum, current) => sum + current, 0 );
  const displayFiveConfirmed= confirmedListPie.reduce( (sum, current) => sum + current, 0 );

  countryListPie.push('All Others');
  deathsListPie.push(totalDeaths-displayFiveDeaths);
  confirmedListPie.push(totalConfirmed-displayFiveConfirmed);
  console.log(' ---- final ----');
  console.log(countryListPie);
  console.log(deathsListPie);
  console.log(confirmedListPie);  
  console.log(chosenCountryName);  

  var tracePie1 = {
    labels: countryListPie,
    values: deathsListPie,
    showlegend:true,
    type: "pie",
    marker: {
      colors: [
        '#268BD2',
        '#6f42c1',
        '#D33682',
        '#2AA198',
        '#b58900',
        '#073642',
      ],
      opacity: 0.71,
      line: {
        color: '#002B36',
        width: 8
      }
    },
    title: {
      text: chosenCountryName+"in Confirmed Cases",
      font: {
        size: 12,
        color: '#b58900',
      }
    }            
  };
  var layoutPie = {
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
    }
  };
  var $pie = document.getElementById('pie-deaths');
  Plotly.plot($pie, [tracePie1], layoutPie);
}

function chosenFiguresUp(data, chosenId) {
  const format = d3.format(',');
  const formatDecimal = d3.format('.4');

  chosenCountry = data.locations[chosenId];
  d3.select('#countryName').text(chosenCountry.country);
  d3.select('#countryCode').text(chosenCountry.country_code);
  d3.select('#countryPop').text(format(chosenCountry.country_population));

  d3.select('#countryLat').text(formatDecimal(chosenCountry['coordinates'].latitude));
  d3.select('#countryLong').text(formatDecimal(chosenCountry['coordinates'].longitude));
  let chosenCountryLatest = chosenCountry['latest'];
  d3.select('#countryDeaths').text(format(chosenCountryLatest.deaths));
  d3.select('#countryConfirmed').text(format(chosenCountryLatest.confirmed));
}

function selectOptionsUp(data) {
  const locsArray = data.locations;
  var innerHTML = '';
  var optionHTML = '';
  for (let i = 0; i < locsArray.length; i++) {
    const objJSON = locsArray[i];
    optionHTML
      += `<option value="${objJSON.id} ">${objJSON.country} ${objJSON.province}</option>`;
  }
  $countrySelect.innerHTML = optionHTML;
}

function overallCountUp(data) {
  const format = d3.format(',');
  d3.select('#overallDeaths').text(format(data.latest.deaths));
  d3.select('#overallConfirmed').text(format(data.latest.confirmed));
}

function chosenGaugeUp(data, chosenId) {
  const formatDecimal = d3.format('.4');
  chosenCountry = data.locations[chosenId];
  chosenCountryName = chosenCountry.country;
  let deaths = chosenCountry['latest'].deaths;
  let confirmed = chosenCountry['latest'].confirmed;
  let pop = chosenCountry.country_population;
  let percDeaths = deaths / pop * 1000000;
  let percConfirmed = confirmed / pop * 10000;

  var dataDeaths = [{
    type: "indicator",
    mode: "gauge+number+delta",
    value: percDeaths,
    title: {
      text: `${chosenCountryName}: Deaths Per Million`,
      font: {
        size: 12
      }
    },
    gauge: {
      axis: {
        range: [null, 100],
        tickwidth: 1,
        tickcolor: "#B58900"
      },
      bar: {
        color: "#2aa198",
        line: {
          color: "#002B36",
          width: 4
        },
      },
      bgcolor: "#002B36",
      borderwidth: 2,
      bordercolor: "#B58900",
      steps: [{
        range: [30, 50],
        color: "#6610f2"
      }],
      threshold: {
        line: {
          color: "#B58900",
          width: 8
        },
        thickness: 0.75,
        value: 100
      }
    }
  }];
  var dataConfirmed = [{
    type: "indicator",
    mode: "gauge+number+delta",
    value: percConfirmed,
    title: {
      text: `${chosenCountryName}:Confirmed in 10,000`,
      font: {
        size: 12,
        color: '#b58900'
      }
    },
    gauge: {
      axis: {
        range: [null, 100],
        tickwidth: 1,
        tickcolor: "#B58900"
      },
      bar: {
        color: "#6610f2",
        line: {
          color: "#002B36",
          width: 4
        },
      },
      bgcolor: "#002B36",
      borderwidth: 2,
      bordercolor: "#B58900",
      steps: [{
          range: [0, 30],
          color: "#073642"
        },
        {
          range: [30, 50],
          color: "#2aa198"
        }
      ],
      threshold: {
        line: {
          color: "#B58900",
          width: 8
        },
        thickness: 0.75,
        value: 100
      }
    }
  }];
  var layout = {
    showlegend: true,
    legend: {
      x: 1,
      xanchor: 'right',
      y: 0.5
    },
    plot_bgcolor: "#002B36",
    paper_bgcolor: "#002B36",
    responsive: true,
    margin: {
      t: 5,
      r: 5,
      l: 5,
      b: 5
    },
    font: {
      color: "#B58900",
      family: "Tahoma"
    }
  };
  var layout2 = {
    plot_bgcolor: "#002B36",
    paper_bgcolor: "#002B36",
    responsive: true,
    margin: {
      t: 5,
      r: 5,
      l: 5,
      b: 5
    },
    font: {
      color: "#B58900",
      family: "Tahoma"
    }
  };

  $gaugeDeaths = document.getElementById('gauge-deaths');
  $gaugeConfirmed = document.getElementById('gauge-confirmed');
  Plotly.newPlot($gaugeDeaths, dataDeaths, layout);
  Plotly.newPlot($gaugeConfirmed, dataConfirmed, layout2);

}

function chosenBubbleUp(data, chosenId) {
  console.log(' --- Data for Bubble --- ');
  var chosenCountry = data.locations[chosenId];
  var countryList = [];
  var populationList = [];
  var deathsList = [];
  var confirmedList = [];

  var countryIds = [chosenId, 225, 137, 201];

  countryIds.forEach(id => {
    countryList.push(data.locations[id].country);
    populationList.push(data.locations[id].country_population);
    deathsList.push(data.locations[id].latest.deaths);
    confirmedList.push(data.locations[id].latest.confirmed);
  });

  let chinaName = 'China';
  let chinaPop = data.locations[49].country_population;
  let chinaDeaths = 0;
  let chinaConfirmed = 0;


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

  var trace1 = {
    x: countryList,
    y: deathsList,
    mode: 'markers',
    marker: {
      size: populationList,
      sizemode: 'diameter',
      color: '#073642',
      opacity: 0.99,
      sizeref: 10000000,
      line: {
        color: '#b58900',
        width: 2
      }
    }
  };
  var layoutBubble1 = {
    title: {
      text: `${chosenCountryName} vs. US, China, Italy, Spain in Deaths`,
      font: {
        size: 12,
        color: '#b58900',
      }
    },
    plot_bgcolor: "#002B36",
    paper_bgcolor: "#002B36",
    showlegend: false,
    responsive: true,
    margin: {
      t: 25,
      r: 15,
      l: 25,
      b: 30
    },
    padding: 1,
    type: "bar",
    responsive: true,
    xaxis: {
      tickfont: {
        size: 10,
        color: '#B58900',
      },
      showgrid: true,
      zeroline: false,
      showline: false,
      mirror: 'ticks',
      gridcolor: '#073642',
      gridwidth: 0.05,
      zerolinecolor: '#002B36',
      zerolinewidth: 0.25,
      linecolor: '#B58900',
      linewidth: 0.25,
    },
    yaxis: {
      tickfont: {
        size: 10,
        color: '#B58900',
      },
      showgrid: true,
      zeroline: false,
      showline: false,
      mirror: 'ticks',
      gridcolor: '#073642',
      gridwidth: 0.05,
      zerolinecolor: '#002B36',
      zerolinewidth: 0.25,
      linecolor: '#B58900',
      linewidth: 0.25,
    },
  };
  var trace2 = {
    x: countryList,
    y: confirmedList,
    mode: 'markers',
    marker: {
      size: populationList,
      sizemode: 'diameter',
      color: '#073642',
      opacity: 0.99,
      sizeref: 10000000,
      line: {
        color: '#268bd2',
        width: 2
      }
    }
  };
  var layoutBubble2 = {
    title: {
      text: `${chosenCountryName} vs. US, China, Italy, Spain in Confirmed Cases`,
      font: {
        size: 10,
        color: '#b58900',
      }
    },
    plot_bgcolor: "#002B36",
    paper_bgcolor: "#002B36",
    showlegend: false,
    responsive: true,
    margin: {
      t: 25,
      r: 15,
      l: 25,
      b: 30
    },
    padding: 1,
    type: "bar",
    responsive: true,
    xaxis: {
      tickfont: {
        size: 10,
        color: '#B58900',
      },
      showgrid: true,
      zeroline: false,
      showline: false,
      mirror: 'ticks',
      gridcolor: '#073642',
      gridwidth: 0.05,
      zerolinecolor: '#002B36',
      zerolinewidth: 0.25,
      linecolor: '#B58900',
      linewidth: 0.25,
    },
    yaxis: {
      tickfont: {
        size: 10,
        color: '#B58900',
      },
      showgrid: true,
      zeroline: false,
      showline: false,
      mirror: 'ticks',
      gridcolor: '#073642',
      gridwidth: 0.05,
      zerolinecolor: '#002B36',
      zerolinewidth: 0.25,
      linecolor: '#268bd2',
      linewidth: 0.25,
    },
  };
  var $bubble = document.getElementById('bubble-deaths');
  var $bubble2 = document.getElementById('bubble-confirmed');
  Plotly.newPlot($bubble, [trace1], layoutBubble1);
  Plotly.newPlot($bubble2, [trace2], layoutBubble2);

  //  ------------- HISTOGRAM -------------
  
    // Create the Trace
    var traceHist = {
      x: countryList,
      y: deathsList,
      type: "bar",
      orientation: "v",
      marker: {
        color: '#6610f2',
        opacity: 0.99,
        line: {
          color: '#002B36',
          width: 1
        }
      }
    };
    // Create the data array for the plot
    var layoutHist = {
    title: {
      text: `${chosenCountryName} vs. US, China, Italy, Spain in Deaths`,
      font: {
        size: 12,
        color: '#b58900',
      }
    },      
      margin: {
        t: 25,
        b:15,
        l:25,
        r:15,
      },
      padding: 1,
      responsive: true,
      plot_bgcolor: "#002B36",
      paper_bgcolor: "#002B36",
      xaxis: {
        tickfont: {
          size: 10,
          color: '#B58900',
        },
        showgrid: true,
        zeroline: false,
        showline: false,
        gridcolor: '#073642',
        gridwidth: 0.05,
        zerolinecolor: '#002B36',
        zerolinewidth: 0.25,
        linecolor: '#B58900',
        linewidth: 0.25,
      },
      yaxis: {
        tickfont: {
          size: 10,
          color: '#B58900',
          showgrid: true,
          zeroline: false,
          showline: false,
          gridcolor: '#073642',
          gridwidth: 0.05,
          zerolinecolor: '#002B36',
          zerolinewidth: 0.25,
          linecolor: '#B58900',
          linewidth: 0.25,
        },
      },
    };
    var $histogram = document.getElementById('histogram-bar-deaths');
    Plotly.newPlot($histogram, [traceHist], layoutHist);  

    var traceHist2 = {
      x: countryList,
      y: confirmedList,
      type: "bar",
      orientation: "v",
      marker: {
        color: '#2AA198',
        opacity: 0.99,
        line: {
          color: '#002B36',
          width: 1
        }
      }
    };
    var layout2 = {
    title: {
      text: `${chosenCountryName} vs. US, China, Italy, Spain in Confirmed Cases`,
      font: {
        size: 12,
        color: '#b58900',
      }
    },      
      margin: {
        t: 25,
        b:15,
        l:25,
        r:15,
      },
      padding: 1,
      responsive: true,
      plot_bgcolor: "#002B36",
      paper_bgcolor: "#002B36",
      xaxis: {
        tickfont: {
          size: 10,
          color: '#B58900',
        },
        showgrid: true,
        zeroline: false,
        showline: false,
        gridcolor: '#073642',
        gridwidth: 0.05,
        zerolinecolor: '#002B36',
        zerolinewidth: 0.25,
        linecolor: '#B58900',
        linewidth: 0.25,
      },
      yaxis: {
        tickfont: {
          size: 10,
          color: '#B58900',
          showgrid: true,
          zeroline: false,
          showline: false,
          gridcolor: '#073642',
          gridwidth: 0.05,
          zerolinecolor: '#002B36',
          zerolinewidth: 0.25,
          linecolor: '#B58900',
          linewidth: 0.25,
        },
      },
    };    
    var $histogram2 = document.getElementById('histogram-bar-confirmed');
    Plotly.newPlot($histogram2, [traceHist2], layout2);  
}

