const ind3x = 6;
var svg = d3.select( "svg" ),
  margin = {
    top: 20,
    right: 20,
    bottom: 30,
    left: 80
  },
  height = window.innerHeight - margin.top - margin.bottom;
width = window.innerWidth - margin.left - margin.right;

//Generates a categorical x axis and a numeric y axis
var x = d3.scaleBand().rangeRound( [ 0, width ] ).padding( 0.1 ),
  y = d3.scaleLinear().rangeRound( [ height, 0 ] );

//Generates chart container that is adjusted by margin parameters
var g = svg.append( "g" )
  .attr( "transform", "translate(" + margin.left + "," + margin.top + ")" );
//Reads data from tsv

d3.csv( urlTest, function ( d ) {
  //set up your data transforms here
  d.Deaths = +d.Deaths;
  d.Confirmed = +d.Confirmed;
  d.Recovered = +d.Recovered;
  d.Active = +d.Active;
  d.People_Tested = +d.People_Tested;
  d.People_Hospitalized = +d.People_Hospitalized;
  return d;
}, function ( error, data ) {
  if ( error ) throw error;
  // console.table( data[ind3x]);

  // console.log( 'object keys :>> ', Object.keys( data[ ind3x ] ) );
  // console.log('object :>> ', [ 0, d3.max( data[ ind3x ], function ( d ) {
  //   return d.Confirmed;
  // } ) ]);
  //Sets categorical x domain based on given column
  x.domain( Object.keys( data[ ind3x ] ) );
  // console.log('line 36 :>> ', );
  y.domain( [ 0, d3.max( data[ ind3x ], function ( d ) {
    return d.Confirmed;
  } ) ] );

  //Draw x axis and adjust for container size
  g.append( "g" )
    .attr( "class", "axis axis--x" )
    .attr( "transform", "translate(0," + height + ")" )
    .call( d3.axisBottom( x ) );
  //Draw y axis with various styling and transforms
  g.append( "g" )
    .attr( "class", "axis axis--y" )
    .call( d3.axisLeft( y ).ticks( 10, "%" ) )
    .append( "text" )
    .attr( "transform", "rotate(-90)" )
    .attr( "y", 6 )
    .attr( "dy", "0.71em" )
    .attr( "text-anchor", "end" )
    .text( "Value" );
  //Draw bars for each name and value in data
  g.selectAll( ".bar" )
    .data( function ( entry ) {
      return Object.keys( data[ ind3x ] ).map( function ( d, i ) {
          return {
            i: d,
            value: [ d ]
          };
      } );
    } )
    .enter().append( "rect" )
    .attr( "class", "bar" )
    .attr( "x", function ( d ) {
      return x( d );
    } )
    .attr( "y", function ( d ) {
      return y( d.value );
    } )
    .attr( "width", x.bandwidth() )
    .attr( "height", function ( d ) {
      return height - y( d.value );
    } ); //draws bars on screen from top to bottom
} ); 

