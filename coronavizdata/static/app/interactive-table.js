let  urlTest = "../static/data/states.csv";
const columnsDisplayed = ["Province_State", "Deaths", "Confirmed", "Recovered", "Active"];

tableInteractive(urlTest, columnsDisplayed);
// tableInteractive(urlCompiled, columnsDisplayed);

// vizBoxUp(dSum);
function tableInteractive(url,c0lumns) {
  const format = d3.format( ',' );
  let columns = ['Flag'];
  c0lumns.forEach(element => {
    columns.push(element)
  });
  var table = d3.select( "#table-goes-here" )
    .append( "table" )
    .attr( "class", "table table-condensed table-striped table-hover text-center border-none" ), thead = table.append( "thead" ), tbody = table.append( "tbody" );
  
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
      .on( "mouseover", function ( d,i ) {
        d3.select( this )
          .attr( "class", "shadow-after" );
        vizBoxUp( d, i );
      } )
      .on( "mouseout", function ( d ) {
        console.log('d :>> ', d);
        d3.select( this )
          .attr( "class", "shadow-before" );
        d3.select('#viz-box')
          .select('h2')
          .text('US States vs COVID-19');
        d3.select('#viz-box')
          .select("img")
          .style("height","10rem")
          .attr("src", '/static/img/states/default.png')
          ;          
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
          return '<h4 class="fa animated infinite pulse mt-3 text-robo add-anime shadow-turq">'
          +d.value
          +'</h4>'
          ;
        }
        else {
          return format(d.value);
        }
      } );
      // console.log('d :>> ', cells);
  } );

  function vizBoxUp( d, i ) {
    let z = {};
    z.Active = +d.Active;
    z.Confirmed = +d.Confirmed;
    z.Recovered = +d.Recovered;
    z.People_Tested = +d.People_Tested;
    z.Deaths = +d.Deaths;
    z.People_Hospitalized = +d.People_Hospitalized;            
    console.table(z);
    const zKeys = Object.keys(z);
    let listOfValues = [];
    const zValues =  zKeys.map((key) => {
       return format(d[key]);
    });
      
    console.log('zValues :>> ', zValues);
    console.log('zKeys :>> ', zKeys);
    
    const zKeysv1 = [ "Deaths", "Confirmed", "Recovered", "Active", "Tested", "Hospitalized" ];

    const cardTitles = d3
      .select( '#viz-box' )
      .selectAll( '.card-title' )
      .data(zKeysv1)
      .text(function(d) {return d ;});
      
    const cardTexts = d3
      .select( '#viz-box' )
      .selectAll( '.card-t3xt' )
      .data(zValues)
      .text(function(d) {return d ;});

    d3.select( '#viz-box' )
      .select( 'h2' )
      .text( d.Province_State + " " + i );
    d3.select( '#viz-box' )
      .select( "img" )
      .style( "height", "9rem" )
      .attr( "src", '/static/img/states/' + d.Province_State.trim().toLowerCase().replace( ' ', '-' ) + '-flag-small.png' );
  }
}
  
