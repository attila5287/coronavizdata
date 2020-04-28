var testdata = testdata; // from testdata.js
console.log(testdata);

const $countrySelect = document.getElementById('opts'); // selectfield
let defaultId = 213;  // turkey country code as initial value

fetchTestData(testdata);

function fetchTestData(testdata){
  selectOptionsUp(testdata);
  overallCountUp(testdata);
  chosenFiguresUp(testdata, defaultId);
  table4OnePlease(testdata, defaultId);
  
  d3.select('#opts')
  .on('change', function () {
    let chosenId = eval(d3.select(this).property('value'));
      chosenFiguresUp(data, chosenId);

    chosenFiguresUp(testdata, defaultId);
    table4OnePlease(testdata, defaultId);
    
  });
}

// fetchLatestData();

function fetchLatestData() {
  
  const url = 'https://coronavirus-tracker-api.herokuapp.com/v2/locations';
  d3.json(url, (error, data) => {
    if (error) {
      throw error;
    }
    
    // count for overall data
    overallCountUp(data);
    
    // function that fills up the options in select element
    selectOptionsUp(data);
    
    // table
    table4OnePlease(data, defaultId);
    
    // show selection detail, set to default
    chosenFiguresUp(data, defaultId);
    
    // dynamic part here
    d3.select('#opts')
    .on('change', function () {
      let chosenId = eval(d3.select(this).property('value'));
      chosenFiguresUp(data, chosenId);
      table4OnePlease(data, chosenId);
      
      });

  });
}

function table4OnePlease(data, chosenId) {
  console.log(' --- Data for Table --- ');
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


  let dictArray = [];
  let dict = {
    'name': '',
    'population': 0,
    'deaths': 0,
    'confirmed': 0
    };    
  for (let i = 0; i < countryList.length; i++) {
    
    dict['name'] = countryList[i];
    console.log(dict['name']);
    dict['population'] = populationList[i];
    dict['deaths']  = deathsList[i];
    dict['confirmed'] = confirmedList[i];
    dictArray.push(dict);
    console.log(dict);
  }
  console.log(dictArray);


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

d3.select("tbody")
  .selectAll("tr")
  .data(dictArray)
  .enter()
  .append("tr")
  .html(function(d) {
    return `<td>${d.name}</td><td>${d.population}</td><td>${d.deaths}</td><td>${d.confirmed}</td>`;
  });
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

