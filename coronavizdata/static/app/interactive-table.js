const format = d3.format( ',' );
let urlTest = "../static/data/states.csv";
const columnsDisplayed = [ "Province_State", "Deaths", "Confirmed", "Recovered", "Active" ];

tableInteractive( urlTest, columnsDisplayed );
// tableInteractive(urlCompiled, columnsDisplayed);

function tableInteractive( url, c0lumns ) {
  // const format = d3.format( ',' );
  let columns = [ 'Flag' ];
  c0lumns.forEach( element => {
    columns.push( element )
  } );
  var table = d3.select( "#table-goes-here" )
    .append( "table" )
    .attr( "class", "table table-condensed table-striped table-hover text-center text-xlarger py-0 text-success" ),
    thead = table.append( "thead" ),
    tbody = table.append( "tbody" );

  d3.csv( url, function ( error, data ) {
    // Get every column value
    // var columns = Object.keys( data[ 0 ] );

    const rankDicts = rankingDict( data );
    // console.log(rankDicts);
    var header = thead.append( "tr" )
      .selectAll( "th" )
      .data( columns )
      .enter()
      .append( "th" )
      .attr( "class", "shadow-after" )
      .text( function ( d ) {
        return d;
      } )
      .on( "click", function ( d ) {
        if ( d == "Province_State" ) {
          rows.sort( function ( a, b ) {
            if ( a[ d ] < b[ d ] ) {
              return -1;
            }
            if ( a[ d ] > b[ d ] ) {
              return 1;
            } else {
              return 0;
            }
          } );
        } else if ( d.split( " " )[ 0 ] == "Percent" ) {
          rows.sort( function ( a, b ) {
            return +b[ d ].split( "%" )[ 0 ] - +a[ d ].split( "%" )[ 0 ];
          } );
        } else {
          rows.sort( function ( a, b ) {
            return b[ d ] - a[ d ];
          } );
        }
      } );
    var rows = tbody.selectAll( "tr" )
      .data( data )
      .enter()
      .append( "tr" )
      .on( "mouseover", function ( d, i ) {
        d3.select( this )
          .attr( "class", "shadow-after add-anime" );
        numBoxUp( d, i );
        rowChartUp( d, i );
        rankBoxUp( rankDicts, d, i );
        // barChartUp( d, i );
      } )
      .on( "mouseout", function ( d ) {
        // console.log('d :>> ', d);
        d3.select( this )
          .attr( "class", "shadow-before" );

        vizBoxDown();
      } );


    var cells = rows.selectAll( "td" )
      .data( function ( row ) {
        return columns.map( function ( d, i ) {
          if ( d == "Flag" ) {
            return {
              i: d,
              value: row.Province_State.trim().toLowerCase().replace( ' ', '-' )
            };
          } else {
            return {
              i: d,
              value: row[ d ]
            };
          }
        } );
      } )
      .enter()
      .append( "td" )
      .html( function ( d ) {
        if ( d.i == "Flag" ) {
          return '<img class="img-thumbnail bordered add-anime" src="' +
            '/static/img/states/' +
            d.value +
            '-flag-small.png' +
            '" alt="' +
            d.value +
            '  " style="height: 2rem;"></img>';
        } else if ( d.i == "Province_State" ) {
          return '<strong>' +
            '<em>' +
            d.value +
            '</em>' +
            '</strong>';
        } else {
          return format( d.value );
        }
      } );
    // console.log('d :>> ', cells);
  } );
}

function numBoxUp( d, i ) {
  let z = {};
  z.Active = +d.Active;
  z.Confirmed = +d.Confirmed;
  z.Recovered = +d.Recovered;
  z.People_Tested = +d.People_Tested;
  z.Deaths = +d.Deaths;
  z.People_Hospitalized = +d.People_Hospitalized;
  // console.table(z);
  const zKeys = Object.keys( z );
  let listOfValues = [];
  const zValues = zKeys.map( ( key ) => {
    return format( d[ key ] );
  } );

  // console.log('zValues :>> ', zValues);
  // console.log('zKeys :>> ', zKeys);

  const zKeysv1 = [ "Active", "Confirmed", "Recovered", "Tested", "Deaths", "Hospitalized" ];

  const cardTitles = d3
    .select( '#num-box' )
    .selectAll( '.category-title' )
    .data( zKeysv1 )
    .text( function ( d ) {
      return d;
    } );

  const cardTexts = d3
    .select( '#num-box' )
    .selectAll( '.number-of-person' )
    .data( zValues )
    .text( function ( d ) {
      return d;
    } );

  d3.select( '#num-box' )
    .selectAll( '.name-title' )
    .text( d.Province_State );

  d3.select( '#num-box' )
    .select( "img" )
    .style( "height", "3rem" )
    .attr( "src", '/static/img/states/' + d.Province_State.trim().toLowerCase().replace( ' ', '-' ) + '-flag-small.png' );
}

function vizBoxDown() {
  let dTest = {
  Active: "269255.0",
  Confirmed: "362764",
  Country_Region: "US",
  Deaths: "29229",
  FIPS: "36",
  Hospitalization_Rate: "21.37064317297196",
  ISO3: "USA",
  Incident_Rate: "1864.7691289013871",
  Last_Update: "2020-05-26 02:32:41",
  Lat: "42.1657",
  Long_: "-74.9481",
  Mortality_Rate: "8.057304473431763",
  People_Hospitalized: "77525",
  People_Tested: "1739449",
  Province_State: "New York",
  Recovered: "64280",
  Testing_Rate: "8941.54545792413",
  UID: "84000036",
};
  // vizBoxUp(dTest);
  d3.select( '#bar-chart-horizontal' )
    .select( 'svg' )
    .remove()
    ;
  // d3.select( '#bar-chart-horizontal' )
  //   .append( 'svg' )
  //   ;
}

function rankingDict( data ) {
  function dictGen( columnName ) {
    const sorted = data.sort( function ( a, b ) {
      return b[ columnName ] - a[ columnName ];
    } );
    // console.log('sorted :>> ', sorted);
    let dict = {};
    sorted.forEach( ( d, i ) => {
      dict[ d.Province_State ] = i + 1;
    } );
    return dict;
  }
  categories = [ "Active", "Confirmed", "Recovered", "People_Tested", "Deaths", "People_Hospitalized" ];
  const output = categories.map( column => {
    return dictGen( column );
  } );
  // console.log('output only rankings:>> ', output);
  // console.table(output);
  return output;
}

function rankBoxUp( arrOfSortedDict, d, i ) {
  const name = d.Province_State;
  let out = arrOfSortedDict.map( dict => dict[ d.Province_State ] );
  // console.log('out :>> ', out);
  const rankings = d3
    .select( '#num-box' )
    .selectAll( '.ranking-order' )
    .data( out )
    .text( function ( d ) {
      return d;
    } );
}

function rowChartUp( d, i ) {

  console.log( d );
  const format = d3.format( ',' );
  let z = {};
  z.Active = +d.Active;
  z.Confirmed = +d.Confirmed;
  z.Recovered = +d.Recovered;
  z.Deaths = +d.Deaths;
  z.People_Hospitalized = +d.People_Hospitalized;
  // console.table(z);
  const zKeys = Object.keys( z );
  let listOfValues = [];
  const zValues = zKeys.map( ( key ) => {
    return +d[ key ];
  } );
  let colors = [
    '#B58900', '#80cdc1',
    '#268BD2', '#D33682', '#CB4B16'
  ];
  // create an array to store dictionaries nxt step
  const dictArray = [];
  // generate new objects -dictionaries- 
  for ( let i = 0; i < zKeys.length; i++ ) {
    let dict = {

      name: '',
      value: 0
    };
    dict.name = zKeys[ i ];
    dict.value = +z[ zKeys[ i ] ];
    dict.color = colors[ i ];
    dictArray.push( dict );
  }

  //set up svg using margin conventions - we'll need plenty of room on the left for labels
  var margin = {
    top: 15,
    right: 50,
    bottom: 15,
    left: 70
  };

  var svgWidth = window.innerWidth * .4;
  var svgHeight = svgWidth * .75;
  var width = svgWidth - margin.left - margin.right,
    height = svgHeight - margin.top - margin.bottom;

  var svg = d3.select( "#bar-chart-horizontal" ).append( "svg" )
    .attr( "width", width + margin.left + margin.right )
    .attr( "height", height + margin.top + margin.bottom )
    .append( "g" )
    .attr( "transform", "translate(" + margin.left + "," + margin.top + ")" );

  var x = d3.scale.linear()
    .range( [ 0, width ] )
    .domain( [ 0, d3.max( dictArray, function ( d ) {
      return d.value;
    } ) ] );

  var y = d3.scale.ordinal()
    .rangeRoundBands( [ height, 0 ], .1 )
    .domain( dictArray.map( function ( d ) {
      return d.name;
    } ) );

  //make y axis to show bar names
  var yAxis = d3.svg.axis()
    .scale( y )
    //no tick marks
    .tickSize( 0 )
    .orient( "left" );

  var gy = svg.append( "g" )
    .attr( "class", "axis-text" )
    .call( yAxis )

  var bars = svg.selectAll( ".bar" )
    .data( dictArray )
    .enter()
    .append( "g" );

  bars.append( "rect" )
    .attr( "class", "bar" )
    .attr( "class", "bar" )
    .attr( "rx", "3px" )
    .attr( "ry", "10px" )
    .style( "stroke", "#002b36" )
    .style( "stroke-width", "4px" )
    .attr( "fill", d => d.color )
    .attr( "y", function ( d ) {
      return y( d.name );
    } )
    .attr( "height", y.rangeBand() )
    .attr( "x", 0 )
    .attr( "width", function ( d ) {
      return x( d.value );
    } );

  //add a value label to the right of each bar
  bars.append( "text" )
    .attr( "class", "label" )
    //y position of the label is halfway down the bar
    .attr( "y", function ( d ) {
      return y( d.name ) + y.rangeBand() / 2 + 4;
    } )
    //x position is 3 pixels to the right of the bar
    .attr( "x", function ( d ) {
      return x( d.value ) + 3;
    } ).attr( "fill", d => d.color )
    .text( function ( d ) {
      return format( d.value );
    } );



}
