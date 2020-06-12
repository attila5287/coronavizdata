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
  let col0rs = [
    '#B58900', '#80cdc1',
    '#268BD2', '#D33682', '#CB4B16'
  ];
  let colors = [
    '#B58900',
    '#B58900',
    '#B58900',
    '#B58900',
    '#B58900',
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
