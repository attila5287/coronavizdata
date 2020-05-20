// latestTimeSeries();
var allJSON = testdata.locations.map((d) => {
  return {
  name: d.country,
  lat: +d.coordinates.latitude, 
  lon: +d.coordinates.longitude, 
  pop: +d.country_population, 
  };
});

staticTimeSeries();

function staticTimeSeries() { 
  // var testDataLatest = testdata;
  var data = testdaily;
  let name = 'Turkey'; //default before user selection
  dropDownUpdate( data, 'static' );
  overallCountUp( data );
  // renderDynamicTable( prepData4TableAll( data ) );
  chosenFiguresUp( data, name );
}

function geoMapFinder(name) {
  let obj = {lat: 0,lon: 0};

  console.log(' --- geoMap ---');

  allJSON.forEach((d) => {
    const condition = (name == d.name);
    
    if (condition) {
      obj.lat =d.lat;
      obj.lon =d.lon;
    } else {
      // console.log('pass');
    }
  });
  
  return obj;
}

function latestTimeSeries (){
  const url = 'https://pomber.github.io/covid19/timeseries.json';
  d3.json(url, function(error, data) {
    if (error) throw error;
    let name = 'Turkey'; //default before user selection
    dropDownUpdate( data, 'latest' );
    overallCountUp( data );
    renderDynamicTable( prepData4TableAll( data ) );
    chosenFiguresUp( data, name );
    d3MovingAxes( prepData4Scatter( data, name ) );

    
  });
 }

function chosenFiguresUp( data, name ) {
  // console.log( ' --- chosenFiguresUp ---' );

  // console.log( data );
  // console.log( 'name: '+name );

  let arr = data[ name ];

  let idx = arr.length - 1;

  let lastJSON = arr[ idx ];
  chosenDeaths = lastJSON.deaths;
  chosenConfirmed = lastJSON.confirmed;

  const format = d3.format( ',' );
  d3.select( '#countryName' ).text( name );
  d3.select( '#countryDeaths' ).text( format( chosenDeaths ) );
  d3.select( '#countryConfirmed' ).text( format( chosenConfirmed ) );
  d3.select( '#latestDateUp' ).text( format( chosenConfirmed ) );
}

function overallCountUp( data ) {
  // console.log( ' --- overallCountUp ---' );
  // console.log( data );

  const keys = Object.keys( data )
  // console.log(keys);

  let totalDeaths = 0;
  let totalConfirmed = 0;

  keys.forEach( name => {

    let arr = data[ name ];

    let idx = arr.length - 1;

    let lastJSON = arr[ idx ];
    totalDeaths += lastJSON.deaths;
    totalConfirmed += lastJSON.confirmed;
  } );

  // console.log(totalDeaths);
  // console.log(totalConfirmed);

  const format = d3.format( ',' );
  d3.select( '#overallDeaths' ).text( format( totalDeaths ) );
  d3.select( '#overallConfirmed' ).text( format( totalConfirmed ) );
}

function selectOptionsUp( data ) {
  const locsArray = data.locations;
  var innerHTML = '';
  var optionHTML = '';
  for ( let i = 0; i < locsArray.length; i++ ) {
    const objJSON = locsArray[ i ];
    optionHTML
      += `<option value="${objJSON.id} ">${objJSON.country} ${objJSON.province}</option>`;
  }
  $countrySelect.innerHTML = optionHTML;
}

function renderDynamicTable( data ) {
  var rows = [];

  data.map( ( d ) => {
    let dict = {}

    const dates = d.dates;
    // console.log(dates);
    const dailyRecords = d.rollingSumDeaths;
    const numRecords = dailyRecords.length;
    const slice = Math.round( numRecords * .16 );
    // console.log(slice);
    const first = dates[ 0 ];
    const t2 = dates[ numRecords - slice - slice - slice - slice ];
    const t3 = dates[ numRecords - slice - slice - slice ];
    const t4 = dates[ numRecords - slice - slice ];
    const t5 = dates[ numRecords - slice ];
    const last = dates[ numRecords - 1 ];

    dict.name = d.name;
    dict[ first ] = d.rollingSumDeaths[ 0 ];
    dict[ t2 ] = d.rollingSumDeaths[ numRecords - slice - slice - slice - slice ];
    dict[ t3 ] = d.rollingSumDeaths[ numRecords - slice - slice - slice ];
    dict[ t4 ] = d.rollingSumDeaths[ numRecords - slice - slice ];
    dict[ t5 ] = d.rollingSumDeaths[ numRecords - slice ];
    dict[ last ] = d.rollingSumDeaths[ numRecords - 1 ];

    rows.push( dict );
  } );

  // console.log('--- rows ----');
  // console.log(rows);

  const $thead = document.querySelector( "thead" );
  $thead.innerHTML = "";
  let inner = "";
  var headers = Object.keys( rows[ 0 ] );
  // console.log(headers);
  for ( var j = 0; j < headers.length; j++ ) {
    var header = headers[ j ];
    inner += '<th>' + header + '</th>';
  }
  $thead.innerHTML += inner;

  // d3.select("thead")
  //   .selectAll("th")
  //   .data(dictArray)
  //   .enter()
  //   .append("th")
  //   .html(function(d) {
  //     return `<th>${d.name}</td><td>${d.population}</td><td>${d.deaths}</td><td>${d.confirmed}</th>`;
  //   });
  const $tbody = document.querySelector( "tbody" );
  const format = d3.format( ',' );
  $tbody.innerHTML = "";
  for ( var i = 0; i < rows.length; i++ ) {
    // Get  the sightings object and its fields
    var currentRow = rows[ i ];
    var fields = Object.keys( currentRow );
    // Create a new row in the tbody, set the index to be i + startingIndex
    var $row = $tbody.insertRow( i );
    for ( var j = 0; j < fields.length; j++ ) {

      var field = fields[ j ];
      // console.log(field);
      condition = ( j == 0 ) // country name is the first field in a row
      var $cell = $row.insertCell( j );
      // condition = (typeof currentRow[field] == "string") // country name is string
      if ( condition ) {
        $cell.innerText = currentRow[ field ]; // dont format strings

      } else {
        $cell.innerText = format( currentRow[ field ] );
      }
    }
  }
}

function prepData4TableAll( data ) {


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
      'latest': 0,
      'rollingSumDeaths': [],
      // 'rollingSumConfirmed': [],
      'dates': []
    };
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
    // added below to sort coutnries
    dict.latest = dict.rollingSumDeaths[ dict.rollingSumDeaths.length - 1 ]
    dictArray.push( dict );

  } );

  // console.log(dictArray);
  // console.log( ' ___ data prep done! ___ ' );


  return dictArray.sort( function ( x, y ) {
    return d3.descending( x.latest, y.latest );
  } )
}

function prepDataFromJSON( data, chosenCountry ) {
  // console.log(data);
  // const keys = Object.keys( data )
  const keys = [
    'US',
    'Italy',
    'Spain',
    'Germany',
    'China',
    chosenCountry
  ]

  const dataReady = keys.map( ( country ) => {
    return {
      name: country,
      values: data[ country ].map( ( obj ) => {
        return {
          date: obj.date,
          deaths: +obj.deaths
        }
      } )

    }

  } );
  return dataReady.sort( function ( x, y ) {
    return d3.descending( x.latest, y.latest );
  } )
}

function dropDownUpdate( data, static_or_latest ) {
  const keys = Object.keys( data );

  const format = d3.format( ',' );
  const ddJSON = keys.map( ( country, i ) => {
    const array = data[ country ];
    const lastIndex = data[ country ].length - 1;
    return {
      text: country,
      value: country,
      selected: false,
      description: `deaths ${format(array[lastIndex].deaths)} cases ${format(array[lastIndex].confirmed)}`,
      imageSrc: '/static/img/flags/Ensign_Flag_Nation_' + country.toLowerCase().replace( ' ', '_' ) + '-128.png'

    };

  } );

  $( '#opts' ).ddslick( {
    data: ddJSON,
    defaultSelectedIndex: 150,
    onSelected: function ( d ) {
      // console.log(d.selectedData.value)

      const static = (static_or_latest == 'static');
      
      if (static) {
        // console.log('dropdown static_or_latest: ', static_or_latest);
        var data = testdaily;
        chosenFiguresUp( data, d.selectedData.value );
        // d3MovingAxes( prepDataFromJSON( data, d.selectedData.value ) );
        
      } else {

        // console.log('dropdown not static');
        
      }

      const latest = (static_or_latest == 'latest');

      if (latest) {
        // console.log('dropdown static_or_latest: ', static_or_latest);

        const name = d.selectedData.value;
        const url = 'https://pomber.github.io/covid19/timeseries.json';
        
        d3.json(url, function(err,data){
          chosenFiguresUp( data, name );
          d3MovingAxes( prepDataFromJSON( data, name  ) );
        });
      } else {
        // console.log('dropdown latest pass');
      }
    }
  } );
}

function prepData4Scatter( data, chosenCountry ) {
// hair_length: 35
// num_albums: 10
// num_hits: 20
// rockband: "Def Leppard"

  // console.log(data);
  // const keys = Object.keys( data )

  const keys = ['US', 'Italy',  'France', 'Brazil', 'Germany', 'Canada', 'China', chosenCountry]

  const dataReady = keys.map( ( country ) => {
    return {
      name: country,
      values: data[ country ]
      .filter((v,i) => i % 2)
      .filter((v,i) => i % 2)
              .map((obj, i) => {
          return {
            date: obj.date,
            deaths: +obj.deaths,
            confirmed: +obj.confirmed,
          }
        } 

        )
    }

  } );
  return dataReady.sort( function ( x, y ) {function xScale(hairData, chosenXAxis) {
  console.log(' --- hairData --- ');
  console.log(hairData);
  // create scales
  var xLinearScale = d3.scaleLinear()
    .domain([d3.min(hairData, d => d[chosenXAxis]) * 0.8,
      d3.max(hairData, d => d[chosenXAxis]) * 1.2
    ])
    .range([0, width]);

  return xLinearScale;

}
    return d3.descending( x.latest, y.latest );
  } )
}

function d3InterActiveAxes () {
  const format = d3.format( ',' );

function prepData4Scatt3r( data, chosenCountry ) {
  const keys = Object.keys( data )
  const length =data[ 'US' ].length;
  console.log('length --> '+length);
  const data4MovingAxes = keys.map( ( country ) => {
    return {
      country: country,
      numConfirmed: +data[ country ][length-1].confirmed,
      numDeaths: +data[ country ][length-1].deaths,
      numRecovered: +data[ country ][length-1].recovered,
    }
  } );
  
  return data4MovingAxes.sort( function ( x, y ) {
    return d3.descending( x.numDeaths, y.numDeaths );
  } )
}  

  
// function used for updating x-scale var upon click on axis label
function xScale(data, chosenXAxis) {
  // create scales
  var xLinearScale = d3.scaleLinear()
    .domain([d3.min(data, d => d[chosenXAxis]) * 0.8,
      d3.max(data, d => d[chosenXAxis]) * 1.2
    ])
    .range([0, width]);

  return xLinearScale;

}

// function used for updating xAxis var upon click on axis label
function renderAxes(newXScale, xAxis) {
  var bottomAxis = d3.axisBottom(newXScale);

  xAxis.transition()
    .duration(1000)
    .call(bottomAxis);

  return xAxis;
}

// function used for updating circles group with a transition to
// new circles
function renderCircles(circlesGroup, newXScale, chosenXaxis) {

  circlesGroup.transition()
    .duration(1000)
    .attr("cx", d => newXScale(d[chosenXAxis]));

  return circlesGroup;
}

// function used for updating circles group with new tooltip
function updateToolTip(chosenXAxis, circlesGroup) {

  if (chosenXAxis === "numConfirmed") {
    var label = "Confirmed:";
  }
  else {
    var label = "Recovered";
  }

  var toolTip = d3.tip()
    .attr("class", "tooltip")
    .offset([80, -60])
    .html(function(d) {
      return (`${d.country}<hr class="border-success m-0">${label} ${format(d[chosenXAxis])}`);
    });

  circlesGroup.call(toolTip);

  circlesGroup.on("mouseover", function(data) {
    toolTip.show(data);
  })
    // onmouseout event
    .on("mouseout", function(data, index) {
      toolTip.hide(data);
    });

  return circlesGroup;
}
var svgWidth = window.innerWidth;
var svgHeight = svgWidth*.5;

var margin = {
  top:   40,
  right: 40,
  bottom: 60,
  left: 40,
};

let width = svgWidth - margin.left - margin.right;
let height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart,
// and shift the latter by left and top margins.
var svg = d3
  .select(".chart")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight)
  .attr( "class", "axisTurq" )
  ;

// Append an SVG group
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Initial Params
var chosenXAxis = "numConfirmed";


  data = prepData4Scatt3r(testdaily).slice(0, 20);
  // xLinearScale function above csv import
  var xLinearScale = xScale(data, chosenXAxis);

  // B58900
  // Create y scale function
  var yLinearScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.numDeaths)])
    .range([height, 0]);

  // Create initial axis functions
  var bottomAxis = d3.axisBottom(xLinearScale)
  ;
  var leftAxis = d3.axisLeft(yLinearScale)
  ;

  // append x axis
  var xAxis = chartGroup.append("g")
    .classed("x-axis", true)
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis)
    ;

  // append y axis
  chartGroup.append("g")
    .call(leftAxis)
    ;

  // append initial circles
  var circlesGroup = chartGroup.selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d[chosenXAxis]))
    .attr("cy", d => yLinearScale(d.numDeaths))
    .attr("r", 20)
    .attr("fill", "aqua")
    .attr("opacity", ".5");

  // Create group for  2 x- axis labels
  var labelsGroup = chartGroup.append("g")
    .attr("transform", `translate(${width / 2},${height+20})`);

  var confLabel = labelsGroup.append("text")
    .attr("x", 0)
    .attr("y", 20)
    .attr("value", "numConfirmed") // value to grab for event listener
    .classed("active", true)
    .text("Num Cases Confirmed")
    ;

  var recovLabel = labelsGroup.append("text")
    .attr("x", 0)
    .attr("y", 40)
    .attr("value", "numRecovered") // value to grab for event listener
    .classed("inactive", true)
    .text("Num Recovered");

  // append y axis
  chartGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left)
    .attr("x", 0 - (height / 2.2))
    .attr("dy", "1em")
    .classed("axis-text", true)
    .text("Deaths")
    .attr( "class", "axisGold" )
    ;

  // updateToolTip function above csv import
  var circlesGroup = updateToolTip(chosenXAxis, circlesGroup);

  // x axis labels event listener
  labelsGroup.selectAll("text")
    .on("click", function() {
      // get value of selection
      var value = d3.select(this).attr("value");
      if (value !== chosenXAxis) {

        // replaces chosenXAxis with value
        chosenXAxis = value;

        // console.log(chosenXAxis)

        // functions here found above csv import
        // updates x scale for new data
        xLinearScale = xScale(data, chosenXAxis);

        // updates x axis with transition
        xAxis = renderAxes(xLinearScale, xAxis)
        ;


        // updates circles with new x values
        circlesGroup = renderCircles(circlesGroup, xLinearScale, chosenXAxis);

        // updates tooltips with new info
        circlesGroup = updateToolTip(chosenXAxis, circlesGroup);
        

        // changes classes to change bold text
        if (chosenXAxis === "numRecovered") {
          recovLabel
            .classed("active", true)
            .classed("inactive", false);
          confLabel
            .classed("active", false)
            .classed("inactive", true);
        }
        else {
          recovLabel
            .classed("active", false)
            .classed("inactive", true);
          confLabel
            .classed("active", true)
            .classed("inactive", false);
        }

  // Add a legend at the end of each line
  var position = data[ 0 ].values.length - 1;
  // console.log( 'position -->> ' + position );
  svg
    .selectAll( "myLabels" )
    .data( dataReady )
    .enter()
    .append( 'g' )
    .append( "text" )
    .datum( function ( d ) {
      return {
        name: d.country,
      };
    } ) // keep only the last value of each time series
    .attr( "transform", function ( d, i ) {
      return "translate(" + x( position ) + "," + y( d.value.deaths ) + ")";
    } ) // Put the text at the position of the last point
    .attr( "x", 8 ) // shift the text a bit more right
    .text( function ( d ) {
      return d.name;
    } )
    .style( "fill", function ( d ) {
      return myColor( d.name )
    } )
    .style( "font-size", 16 )
    .style( "font-style", 'bold' )
    .style( "font-style", 'italic' );


      }
    });

}

function d3BasicScatter( data ) {
// function used for updating x-scale var upon click on axis label
function xScale(hairData, chosenXAxis) { 
  console.log(' --- hairData --- ');
  console.log(hairData);
  // create scales
  var xLinearScale = d3.scaleLinear()
    .domain([d3.min(hairData, d => d[chosenXAxis]) * 0.8,
      d3.max(hairData, d => d[chosenXAxis]) * 1.2
    ])
    .range([0, width]);

  return xLinearScale;

}
// function used for updating xAxis var upon click on axis label
function renderAxes(newXScale, xAxis) {
  var bottomAxis = d3.axisBottom(newXScale);

  xAxis.transition()
    .duration(1000)
    .call(bottomAxis);

  return xAxis;
}


console.log(' --------------- DATA --------------- ');
console.log(data);
  const format = d3.format( ',' );

  // console.log( ' #### SPLAT-JSON-TABLE- ####' );
  const dataReady = data;
  // console.log( dataReady );
  const arrayForScale = dataReady[ 0 ].values
    .map( ( item ) => {
      return item.deaths;

    } );
  // console.log( ' --- arrayForScale ---' );
  // console.log( arrayForScale );
  var allGroup = data.map( ( d ) => {
    return d.name
  } );
  // console.log( allGroup );
  // set the dimensions and margins of the graph
  var margin = {
      top: 20,
      right: 100,
      bottom: 30,
      left: 50
    },
    width = window.innerWidth - margin.left - margin.right;
    height = window.innerHeight - margin.top - margin.bottom;

  // append the svg object to the body of the page
  var svg = d3.select( "#my_dataviz" )
    .append( "svg" )
    .attr( "width", width + margin.left + margin.right )
    .attr( "height", height + margin.top + margin.bottom )
    .append( "g" )
    .attr( "transform",
      "translate(" + margin.left + "," + margin.top + ")" );


  // if the SVG area isn't empty when the browser loads, remove it
  // and replace it with a resized version of the chart
  var svgArea = d3.select( "body" ).select( "#my_dataviz" ).select( "svg" );
  if ( !svgArea.empty() ) {
    svgArea.remove();
  }

  // A color scale: one color for each group
  var myColor = d3.scaleOrdinal()
    .domain( data.length )
    .range( d3.schemeSet3 );

  // scales
  var x = d3.scaleLinear()
    .domain( [ 0, arrayForScale.length ] )
    .range( [ 0, width ] );
  var y = d3.scaleLinear()
    .domain( [ 0, d3.max( arrayForScale ) ] )
    .range( [ height, 0 ] );

  svg.append( "g" )
    .attr( "transform", "translate(0," + height + ")" )
    .attr( "class", "axisGold" )
    .call( d3.axisBottom( x ) );

  svg.append( "g" )
    .attr( "transform", "translate(0,15)" )
    .attr( "class", "axisGold" )
    .call( d3.axisTop( x ) )
  ;

  svg.append( "g" )
    .attr( "class", "axisGold" )
    .attr( "transform", "translate(" + width + ",0)" )
    .call( d3.axisRight( y ) );

  // Add the points
  var circlesGroup = svg
    // First we need to enter in a group
    .selectAll( "myDots" )
    .data( dataReady )
    .enter()
    .append( 'g' )
    .style( "fill", function ( d ) {
      return myColor( d.name )
    } )
    // Second we need to enter in the 'values' part of this group
    .selectAll( "myPoints" )
    .data( function ( d ) {
      return d.values
    } )
    .enter()
    .append( "circle" )
    .attr( "r", 6 )
    .attr( "stroke", "#002B36" )
    .attr( "stroke-width", "1" )
    .attr( "cx", ( d, i ) => x( i ) )
    .attr( "cy", d => y( d.deaths ) )    
    ;



}
