function rowChartUp( d ) {
  // -------RUN D3 RUN: create name/value pairs --->

  const names = [
    "Population",
    "Deaths",
    "Confirmed",
  ];


  // console.table(names);

  const values = names.map( key => +d[ key ] );
  // console.table(values);

  const colors = [
    "a8ddb5",
    "7bccc4",
    "43a2ca"
  ]
  // console.table(colors);
  data = [];
  for ( let i = 0; i < names.length; i++ ) {
    const z = {};
    z.name = names[ i ];
    z.value = values[ i ];
    z.color = colors[ i ];
    data.push( z );
  }
  // console.table(data);

  // -----------RUN D3 RUN: margins------>
  var margin = {
    top: 15,
    right: 50,
    bottom: 15,
    left: 20
  };
  // -----------RUN D3 RUN: svg append------>
  var svgWidth = window.innerWidth * .5;
  var svgHeight = svgWidth * .75;
  var width = svgWidth - margin.left - margin.right;
  var height = svgHeight - margin.top - margin.bottom;

  var svg = d3.select( "#bar-chart-horizontal" ).append( "svg" )
    .attr( "width", width + margin.left + margin.right )
    .attr( "height", height + margin.top + margin.bottom )
    .attr( "class", "rounded-3xl" )
    .append( "g" )
    .attr( "transform", "translate(" + margin.left + "," + margin.top + ")" );

  // -----------RUN D3 RUN: now scales ------>
  let yBandScale = d3.scaleBand()
    .domain( names )
    .range( [ 0, height ] )
    .padding( 0.4 );

  const maxValue = d3.max( values );

  let xLinearScale = d3.scaleLinear()
    .domain( [ 0, maxValue ] )
    .range( [ 0, height ] );

  // test function with different parameters
  // console.log('maxValue >--> ', xLinearScale(maxValue)/width);

  // ----------- RUN D3 RUN: bottom ax ---->
  let leftAxis = d3.axisLeft( yBandScale );


  // ----------- RUN D3 RUN: custom ------>
  let bottomAxis = d3
    .axisBottom( xLinearScale )
    .ticks( 5 );

  // ----------- RUN D3 RUN: custom bar width ------>
  var barThickness = height / data.length / 2.5;
  // console.log('barW :>> ', barWidth);

  let bars = svg.selectAll( ".bar" )
    .data( data )
    .enter().append( "g" );

  let rects = bars.append( "rect" )
    .attr( "class", "bar opac-30" )
    .attr( "rx", "4px" )
    .attr( "ry", "3px" )
    .attr( "fill", "#2aa198" )
    .attr( "stroke-width", "5px" )
    .attr( "stroke", "#2aa198" )
    .attr( "stroke-opacity", "0.9" )
    .attr( "x", 0 )
    .attr( "y", ( d, i ) => yBandScale( names[ i ] ) )
    .attr( "height", barThickness )
    .attr( "width", d => xLinearScale( d.value ) );



  let textNum = svg.append( "g" )
    .attr( "transform", `translate(0, ${height})` )
    .attr( "class", "axisTurq opac-50" )
    .call( bottomAxis )
    .selectAll( "text" )
    .style( "font-size", "11px" )
    .style( "font-family", "Orbitron" )
    .style( "text-anchor", "start" )
    .attr( "fill", "#b58900" )
    .attr( "transform", "rotate(-90)" );

  let textLabels = svg.append( "g" )
    .attr( "class", "axisGold" )
    .call( leftAxis )
    .selectAll( "text" )
    .attr( "dy", "-20" )
    .style( "font-size", "10px" )
    .style( "font-family", "Orbitron" )
    .style( "text-anchor", "start" )
    .attr( "fill", "#b58900" );



}
