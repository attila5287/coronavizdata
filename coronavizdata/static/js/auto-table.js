// var testdata = testdata; // from testdata.js
// fetchTestData();

const $countrySelect = document.getElementById('opts'); // selectfield
let defaultId = 213;  // turkey country code as initial value

timeCirclesUp('Turkey');

fetchLatestData();

// fetchTestData();

function fetchTestData(){
  selectOptionsUp(testdata);
  overallCountUp(testdata);
  chosenFiguresUp(testdata, defaultId);
  // table4OnePlease(testdata, defaultId);
  renderDynamicTable(testdata, defaultId);
  
  d3.select('#opts')
  .on('change', function () {
    let chosenId = eval(d3.select(this).property('value'));
    

    chosenFiguresUp(testdata, chosenId);
    chosenFiguresUp(testdata, chosenId);
    // table4OnePlease(testdata, chosenId);
    renderDynamicTable(testdata, chosenId);
    let chosenCountryName = testdata.locations[chosenId].country;
    timeCirclesUp(chosenCountryName);    
  });
}
function fetchLatestData() {
  
  const url = 'https://coronavirus-tracker-api.herokuapp.com/v2/locations';
  d3.json(url, (error, data) => {
    if (error) {
      console.log(error);
    }
    // count for overall data
    overallCountUp(data);
    
    // function that fills up the options in select element
    selectOptionsUp(data);
    
    // table
    // table4OnePlease(data, defaultId);
    renderDynamicTable(data, defaultId);
    
    // show selection detail, set to default
    chosenFiguresUp(data, defaultId);
    
    // dynamic part here
    d3.select('#opts')
    .on('change', function () {
      let chosenId = eval(d3.select(this).property('value'));
      console.log('chosenId***');
      console.log(chosenId);
      chosenFiguresUp(data, chosenId);
      // table4OnePlease(data, chosenId);
      renderDynamicTable(data, chosenId);
      
      let chosenCountryName = data.locations[chosenId].country;
      timeCirclesUp(chosenCountryName);
      
      });

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


function prepDataFromJSON( data, chosenCountry ) {

  var namesListed = [ 'US', 'China', 'Spain', 'Italy' ];

  namesListed.push( chosenCountry );
  console.log( ' --- prepDataFromJSON --- ' );
  // console.log(data);

  let countryArray = [];

  const keys = Object.keys( data )
  for ( const key of keys ) {
    countryArray.push( key )
  }

  // console.log(countryArray)

  let dictArray = [];

  countryArray.forEach( country => {
    let dict = {
      'name': '',
      'rollingSumDeaths': [],
      // 'rollingSumConfirmed': [],
      'dates': []
    };
    var condition = namesListed.includes( country );

    if ( condition ) {

      dict[ 'name' ] = country;

      let rollingSumDeaths = 0;

      // let rollingSumConfirmed = 0;

      let array = data[ country ];

      for ( let index = 0; index < array.length; index++ ) {
        const dailyRecord = array[ index ];
        dict[ 'rollingSumDeaths' ].push( dailyRecord.deaths );
        // dict[ 'rollingSumConfirmed' ].push( dailyRecord.confirmed );
        dict[ 'dates' ].push( dailyRecord.date );
      }


      dictArray.push( dict );
    }
  } );

  console.log( ' ___ data prep done! ___ ' );

  return dictArray;
}

function splatJSONTable( data ) {

  var svgWidth = 800;
  var svgHeight = 480;
  var margin = {
    top: 20,
    right: 60,
    bottom: 20,
    left: 20
  }
  ;

  const svg = d3
    .select( '.chart' )
    .select( 'svg' )
    .attr( "height", svgHeight )
    .attr( "width", svgWidth );

  var height = svgHeight - margin.top - margin.bottom;
  var width = svgWidth - margin.left - margin.right;

  // console.log(data);
  var chartGroup = svg.append( "g" )
    .attr( "transform", `translate(${margin.left}, ${margin.top})` );


  const arrayForScale = data[ 4 ].rollingSumDeaths;

  var myColor = d3.scaleOrdinal()
    .domain(data.length)
    .range(d3.schemeSet3);
  // scales
  var xScale = d3.scaleLinear()
    .domain( [ 0, arrayForScale.length ] )
    .range( [ 0, width ] );
  var yScale = d3.scaleLinear()
    .domain( [ 0, d3.max( arrayForScale ) ] )
    .range( [ height, 0 ] );

  // ################### LINES ######################
  console.log('lines drawing...');
  data.forEach( d => {
    
    console.log( d.name );
    const array = d.rollingSumDeaths;
    
    // line generator
    var line = d3.line()
    .x( ( d, i ) => xScale( i ) )
    .y( d => yScale( d ) );
    
    // create path
    chartGroup.append( "path" )
    .attr( "d", line( array ) )
    .attr( "fill", "none" )
    .attr("stroke", myColor(d.name) )
    .attr( "stroke-width", "2" )
    .style( "opacity", "0.45" );
  } );
  console.log('...lines completed');
  
    var nestedArr =[];

    data.forEach(d => {
      let nested = {
        name:'',
        values:[]
        }
        ;

      nested.name = d.name;

      d.rollingSumDeaths.forEach(value => {
        let obj ={
          deaths: value,
        }
        nested.values.push(obj)
      });

      nested.values.forEach(element => {
        
      });
      nestedArr.push(nested)
      
    });
    // console.log('nestedArr');
    // console.log(nestedArr);

    // Add the points
    chartGroup
      .selectAll("circle")
      .data(nestedArr)
      .enter()
        .append('g')
        .style("fill", function(d){ return myColor(d.name) })
      // Second we need to enter in the 'values' part of this group
      .selectAll("myPoints")
      .data(function(d){ return d.values })
      .enter()
      .append("circle")
        .attr("r", 3)
        .transition()
        .duration( 1000 )
        .attr( "cx", ( d, i ) => xScale( i ) )
        .attr( "cy", d => yScale( d.deaths ) )
        ;
    


    console.log(nestedArr);
    var position = nestedArr[0].values.length - 1;
    console.log('position---->>>');
    console.log(position);
    // Add a legend at the end of each line
    chartGroup
      .selectAll("myLabels")
      .data(nestedArr)
      .enter()
        .append('g')
        .append("text")
          .datum(function(d) { return {name: d.name, value: d.values[d.values.length - 1]}; }) // keep only the last value of each time series
          .text(function(d) { return d.name; })
          .attr("transform", function(d) { return "translate(" + xScale(position) + "," + yScale(d.value.deaths) + ")"; })
          .attr("x", 12) // shift the text a bit more right          
          .style("fill", function(d){ return myColor(d.name) })
          .style("font-size", 15)
          .style("font-family", 'Arial')
          ;

}

function timeCirclesUp(chosenCountryName) {
  let url = 'https://pomber.github.io/covid19/timeseries.json';
  d3.json( url, function ( error, data ) {
    if ( error )
      throw 'fetch didnt work';
    splatJSONTable( prepDataFromJSON( data, chosenCountryName ) )
    ;
  } );
}

function table4OnePlease(data, chosenId) {
  console.log(' --- Data for Table --- ');
  let dictArray = prepTableData( chosenId, data );

  // console.log(' --- dictArray --- ');
  // console.log(dictArray);

d3.select("tbody")
  .selectAll("tr")
  .data(dictArray)
  .enter()
  .append("tr")
  .html(function(d) {
    return `<td>${d.name}</td><td>${d.population}</td><td>${d.deaths}</td><td>${d.confirmed}</td>`;
  });
}


function prepTableData( chosenId, data ) {
  var countryList = [];
  var populationList = [];
  var deathsList = [];
  var confirmedList = [];
  var countryIds = [ chosenId, 225, 137, 201 ];
  console.log( ' -- countryIds -- ' );
  console.log( countryIds );
  countryIds.forEach( id => {
    countryList.push( data.locations[ id ].country );
    populationList.push( data.locations[ id ].country_population );
    deathsList.push( data.locations[ id ].latest.deaths );
    confirmedList.push( data.locations[ id ].latest.confirmed );
  } );
  let chinaName = 'China';
  let chinaPop = data.locations[ 49 ].country_population;
  let chinaDeaths = 0;
  let chinaConfirmed = 0;
  // sum all 33 provinces of China for death-confirmed total
  for ( let id = 49; id <= 81; id += 1 ) {
    const province = data.locations[ id ];
    chinaDeaths += province.latest.deaths;
    chinaConfirmed += province.latest.confirmed;
  }
  countryList.push( chinaName );
  deathsList.push( chinaDeaths );
  populationList.push( chinaPop );
  confirmedList.push( chinaConfirmed );
  let dictArray = [];
  // console.log('---init dictArray ---');
  // console.log(dictArray);
  const format = d3.format( ',' );
  for ( let i = 0; i < countryList.length; i++ ) {
    // console.log(' --- dict comprehend ---');
    let dict = {
      'name': '',
      'population': 0,
      'deaths': 0,
      'confirmed': 0
    };
    dict.name = countryList[ i ];
    dict.population = format( populationList[ i ] );
    dict.deaths = format( deathsList[ i ] );
    dict.confirmed = format( confirmedList[ i ] );
    // console.log(dict.name);
    // console.log(dict);
    dictArray.push( dict );
  }
  return dictArray;
}


// renderTable 
function renderDynamicTable(data, chosenId) {
  const tableData= prepTableData( chosenId, data );

  const $tbody = document.querySelector("tbody");

    $tbody.innerHTML = "";
    for (var i = 0; i < tableData.length; i++) {
      // Get  the sightings object and its fields
      var CurrentSighting = tableData[i];
      var fields = Object.keys(CurrentSighting);
      // Create a new row in the tbody, set the index to be i + startingIndex
      var $row = $tbody.insertRow(i);
      for (var j = 0; j < fields.length; j++) {

        // For every field in the CurrentSighting object, create a new cell at set its inner text to be the current value at the current sightings field
        
        var field = fields[j];
        var $cell = $row.insertCell(j);
        $cell.innerText = CurrentSighting[field];
      }
    }
}
  
