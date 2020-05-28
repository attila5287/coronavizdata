const urlTest = "../static/data/states.csv";
const columnsDisplayed = ["Province_State", "Deaths", "Confirmed", "Recovered", "Active"];

// tableInteractive(urlTest, columnsDisplayed);
tableInteractive(urlCompiled, columnsDisplayed);

function tableInteractive(url,c0lumns) {
  const format = d3.format( ',' );
  let columns = ['Flag'];
  c0lumns.forEach(element => {
    columns.push(element)
  });
  var table = d3.select( "#table-goes-here" )
    .append( "table" )
    .attr( "class", "table table-condensed table-striped table-hover text-center" ), thead = table.append( "thead" ), tbody = table.append( "tbody" );
  
  d3.csv( url, function ( error, data ) {
    // Get every column value
    // var columns = Object.keys( data[ 0 ] );
    var header = thead.append( "tr" )
      .selectAll( "th" )
      .data( columns )
      .enter()
      .append( "th" )
      .attr( "class", "shadow-after" )
      .text( function ( d ) { return d; } )
      .on( "click", function ( d ) {
        if ( d == "Province_State" ) {
          rows.sort( function ( a, b ) {
            if ( a[ d ] < b[ d ] ) {
              return -1;
            }
            if ( a[ d ] > b[ d ] ) {
              return 1;
            }
            else {
              return 0;
            }
          } );
        }
        else if ( d.split( " " )[ 0 ] == "Percent" ) {
          rows.sort( function ( a, b ) {
            return +b[ d ].split( "%" )[ 0 ] - +a[ d ].split( "%" )[ 0 ];
          } );
        }
        else {
          rows.sort( function ( a, b ) {
            return b[ d ] - a[ d ];
          } );
        }
      } );
    var rows = tbody.selectAll( "tr" )
      .data( data )
      .enter()
      .append( "tr" )
      .on( "mouseover", function ( d ) {
        d3.select( this )
          .attr( "class", "shadow-turqoise" );
      } )
      .on( "mouseout", function ( d ) {
        d3.select( this )
          .attr( "class", "shadow-before" );
      } );
    var cells = rows.selectAll( "td" )
      .data( function ( row ) {
        return columns.map( function ( d, i ) {
          if ( d == "Flag" ) {
            return { i: d, value: row.Province_State.trim().toLowerCase().replace( ' ', '-' ) };
          }
          else {
            return { i: d, value: row[ d ] };
          }
        } );
      } )
      .enter()
      .append( "td" )
      .html( function ( d ) { 
        if ( d.i == "Flag" ) {
          return  '<img class="img-thumbnail bordered add-anime" src="'
          +'/static/img/states/' 
          + d.value
          + '-flag-small.png'          
          +'" alt="'
          + d.value
          +'  " style="height: 3.5rem;"></img>'
          ;
        }
        else if ( d.i == "Province_State" ) {
          return '<h4 class="fa animated infinite pulse mt-3 text-monospace add-anime" style="text-shadow: 4px 4px 8px #2aa198;">'
          +d.value
          +'</h4>'
          ;
        }
        else {
          return format(d.value);
        }
      } );
      console.log('d :>> ', cells);
  } );
}
