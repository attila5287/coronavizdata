const urlTest = '../static/data/locations.json';
const urlFresh = 'http://coronavirus-tracker-api.herokuapp.com/v2/locations';

const namesEurope = [
  "Albania", "Austria", "Belgium", "Bulgaria", "Bosnia and Herzegovina", "Belarus", "Switzerland", "Czechia", "Denmark", "Germany", "Spain", "Estonia", "Finland", "France", "United Kingdom", "Greece", "Croatia", "Hungary", "Ireland", "Iceland", "Italy", "Kosovo", "Lithuania", "Luxembourg", "Latvia", "Moldova", "North Macedonia", "Montenegro", "Netherlands", "Norway", "Poland", "Portugal", "Romania", "Russia", "Serbia", "Slovakia", "Sweden", "Slovenia", "Ukraine", "Turkey"
];

function prepGrpUnqRows( JSON ) {
  console.log( '--------- TABLE-EU ---------------- :>> ' );
  const format = d3.format( ',' );
  let abCodeByName = {},
    popByName = {};

  JSON.locations.forEach( d => {
    const name = d.country;
    popByName[ name ] = +d.country_population;
    abCodeByName[ name ] = d.country_code;
  } )

  // console.log('popByName :>> ', popByName);

  const groupedByDeaths = d3.nest()
    .key( function ( d ) {
      return d.country;
    } )
    .rollup( function ( v ) {
      return d3.sum( v, function ( d ) {
        return d.latest.deaths;
      } );
    } )
    .entries( JSON.locations );
  // console.log('groupedByDeaths :>> ', groupedByDeaths.length);

  const names = groupedByDeaths.map( ( d ) => d.key );

  const groupedByConfirmed = d3.nest()
    .key( function ( d ) {
      return d.country;
    } )
    .rollup( function ( v ) {
      return d3.sum( v, function ( d ) {
        return d.latest.confirmed;
      } );
    } )
    .entries( JSON.locations );
  // console.log('groupedByConfirmed :>> ', groupedByConfirmed.length);

  let deathsByName = {},
    confirmedByName = {};

  groupedByDeaths.forEach( d => {
    deathsByName[ d.key ] = +d.value;
  } )

  groupedByConfirmed.forEach( ( d ) => {

    confirmedByName[ d.key ] = +d.value;

  } )

  // console.log('deathsByName :>> ', deathsByName);
  // console.log('confirmedBy :>> ', confirmedByName);

  // refresh memory: there are 266 entries but only 187 unique country names

  const dataForAll = names.map( name => {
    return {
      'Flag': '/static/img/flags/Ensign_Flag_Nation_' + name.toLowerCase().replace( ' ', '_' ) + '-128.png',
      'Name': name,
      'Code': abCodeByName[ name ],
      'Confirmed': confirmedByName[ name ],
      'Deaths': deathsByName[ name ],
    };
  } )

  const dataForEurope = namesEurope.map( name => {
    return {
      'Flag': '/static/img/flags/Ensign_Flag_Nation_' + name.toLowerCase().replace( ' ', '_' ) + '-128.png',
      'Name': name,
      'Code': abCodeByName[ name ],
      'Deaths': deathsByName[ name ],
      'Confirmed': confirmedByName[ name ],
      'Population': popByName[ name ],
    };
  } )

  let output = {
    all: dataForAll,
    europe: dataForEurope.sort( function ( a, b ) {
      return b[ "Deaths" ] - a[ "Deaths" ];
    } )
  };
  return output;
}
function renderDynamicTable( url ) {

  const format = d3.format( ',' );
  d3.json( url, data => {
    // console.log('data.locations :>> ', data.locations[213]);

    const rankDicts = rankingDict( data ); // part of second step below

    // console.log( 'rankDicts :>> ', rankDicts );

    let table = d3.select( "#table-goes-here" )
      .append( "table" )
      .attr( "class", "table table-striped table-hover text-center text-xlarger py-0 text-success" ),
      thead = table.append( "thead" ).attr( "class", "shadow-after" ),
      tbody = table.append( "tbody" ).attr( "class", "my-0 py-0 text-xlarger" );

    const rowData = prepGrpUnqRows( data ).europe;

    columns = Object.keys( rowData[ 0 ] );
    // console.log( 'columns :>> ', columns );

    let header = thead.append( "tr" )
      .selectAll( "th" )
      .data( columns )
      .enter()
      .append( "th" )
      .text( function ( d ) {
        return d;
      } )
      .on( "click", function ( d ) {
        if ( d == "Flag" || d == "Name" || d == "Code" ) {
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

    let rows = tbody.selectAll( "tr" )
      .data( rowData )
      .enter()
      .append( "tr" )
      .attr( "class", "shadow-before add-anime" )
      .on( "mouseover", function ( d ) {

        // now the third is for row chart
        rowChartUp(d);
        // first step
        numBoxUp( d );
        // second,  complex data process, after rankDicts generated
        rankBoxUp( rankDicts, d );

        d3.select( this )
          .attr( "class", "shadow-after add-anime text-primary text-uppercase text-monospace border-primary" );

          console.log( 'rankBoxUp( rankDicts, d ) ; :>> ', rankBoxUp( rankDicts, d ) );

      } )
      .on( "mouseout", function ( d ) {
        d3.select( this )
          .attr( "class", "shadow-before add-anime" );
        
          

      } );

    // need to specify three types, img, str, no
    let cells = rows.selectAll( "td" )
      .data( function ( row ) {
        return columns.map( function ( d, i ) {
          if ( d == "Flag" ) {
            return {
              i: d,
              value: row.Name.trim().toLowerCase().replace( ' ', '_' ).replace( ' ', '_' )
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
          return '<img class="m-0 py-0 px-1 img-thumbnail bordered rounded-md add-anime" src="/static/img/flags/Ensign_Flag_Nation_' + d.value + '-128.png' +
            '" alt="' +
            d.value +
            '  " style="height: 2.5rem;opacity:70%"></img>';
        } else if ( d.i == "Name" || d.i == "Code" ) {
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
    
  } )
}

function numBoxUp( d ) {
  const form4t = d3.format( ',' );
  
  const keys = [ "Deaths", "Confirmed", "Population" ];
  // console.log( 'keys :>> ', keys );
  
  
  const values = keys.map( key => d[ key ] );
  // console.log( 'values :>> ', values );

  d3.select( '#num-box' )
    .selectAll( '.name-title' )
    .text( d.Name + ': ' + d.Code );

  d3.select( '#num-box' )
    .select( "img" )
    .style( "height", "12rem" )
    .attr( "class", "opac-50 rounded-xl bordered" )
    .attr( "src", '/static/img/flags/Ensign_Flag_Nation_' + d.Name.trim().toLowerCase().replace( ' ', '-' ) + '-128.png' );

  const cardTitles = d3
    .select( '#num-box' )
    .selectAll( '.category-title' )
    .data( keys )
    .text( function ( d ) {
      return d;
    } );

  const cardTexts = d3
    .select( '#num-box' )
    .selectAll( '.number-of-person' )
    .data( values )
    .text( function ( d ) {
      return form4t( d );
    } );

}

function rankBoxUp( arrOfSortedDict, d ) {
  const name = d.Name;
  let out = arrOfSortedDict.map( dict => dict[ d.Name ] );
  // console.log('arrOfSortedDict.map( dict => dict[ d.Name ] )', out);
  const rankings = d3
    .select( '#num-box' )
    .selectAll( '.ranking-order' )
    .data( out )
    .text( function ( d ) {
      return d;
    } );
}

function rankingDict( JSON ) {
  const europe = prepGrpUnqRows(JSON).europe;
  // console.log('data :>> ', europe);

  function dictGen( data, columnName ) {
    const sorted = data.sort( function ( a, b ) {
      return b[ columnName ] - a[ columnName ];
    } );
    
    // console.log('sorted :>> ', sorted);
    
    let dict = {};

    sorted.forEach( ( d, i ) => {
      dict[ d.Name ] = i + 1;
    } );
    return dict;
  }

  const testDict = dictGen(europe, 'Deaths');
  // console.table(testDict);

  const categories = [
    'Deaths',
    'Confirmed',
    'Population',
  ];

  const output = categories.map( column => {
    return dictGen( europe, column );
  } );

  // console.log( 'output only rankings:>> ', output );
  return output;
}


// ------------- RUN------------------
renderDynamicTable( urlTest );
function rowChartUp( d, i ) {
   console.log( d );
   const format = d3.format( ',' );
   let z = {};
   z.Confirmed = +d.Confirmed;
   z.Deaths = +d.Deaths;
   z.Population = +d.Population;
  //  console.table(z);
   const zKeys = Object.keys( z );
   let listOfValues = [];
   const zValues = zKeys.map( ( key ) => {
     return +d[ key ];
   } );
   // create an array to store dictionaries nxt step
   const dictArray = [];
   // generate new objects -dictionaries- 
   for ( let i = 0; i < zKeys.length; i++ ) {
     let dict = {
       name: 'default',
       value: 0
     };
     dict.name = zKeys[ i ];
     dict.value = +z[ zKeys[ i ] ];
     dictArray.push( dict );
   }
   
  console.log('dictArray :>> ', dictArray);

   var margin = {
     top: 15,
    right: 50,
     bottom: 15,
     left: 50
   };

   var svgWidth = window.innerWidth * .5;
   var svgHeight = svgWidth * .75;
   var width = svgWidth - margin.left - margin.right,
     height = svgHeight - margin.top - margin.bottom
     ;

   var svg = d3.select( "#bar-chart-horizontal" ).append( "svg" )
     .attr( "width", width + margin.left + margin.right )
     .attr( "height", height + margin.top + margin.bottom )
     .append( "g" )
     .attr( "transform", "translate(" + margin.left + "," + margin.top + ")" );

   var x = d3.scale.linear()
     .range( [ 0, width ] )
     .domain( [ 0, d3.max( dictArray,  d =>  d.value  ] );

   var y = d3.scale.ordinal()
     .rangeRoundBands( [ height, 0 ], .2 )
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
     .attr( "class", "axisTurq" )
     .call( yAxis );

   var bars = svg.selectAll( ".bar" )
     .data( dictArray )
     .enter()
     .append( "g" );

   bars.append( "rect" )
     .attr( "class", "bar opac-50" )
     .attr( "rx", "3px" )
     .attr( "ry", "10px" )
     .attr( "fill", "#002B36" )
     .attr( "stroke", "#2aa198" )
     .attr( "y", ( d ) => y( d.name ) )
     .attr( "height", y.rangeBand() * .8 )
     .attr( "x", 0 )
     .attr( "width", ( d ) => x( d.value ) );

   bars.append( "text" )
     .attr( "class", "text-digi text-xlarger opac-50" )
     .attr( "y", d => y( d.name ) + y.rangeBand() / 2 + 8 )
     .attr( "x", d => x( d.value ) + 3 )
     .attr( "fill", "#2aa198" )
     .text( function ( d ) {
       return format( d.value );
     } );

   //add a value label to the right of each bar
   bars.append( "text" )
     .attr( "class", "text-orient text-xlarger shadow-gold" )
     .attr( "y", d => y( d.name ) + y.rangeBand() / 2 - 5 )
     .attr( "x", d => -50 )
     .attr( "fill", "#B58900" )
     .text( d => d.name );
 }
