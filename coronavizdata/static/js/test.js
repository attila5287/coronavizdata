
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
  renderDynamicTable( prepData4TableAll( data ) );
  chosenFiguresUp( data, name );
  d3InterActiveAxes();
  // d3MovingAxes( prepData4Scatter( data, name ) );
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
