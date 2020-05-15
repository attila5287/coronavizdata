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
