function rowChartUp( d, i ) {

  // console.log( d );
  const format = d3.format( ',' );
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
    return +d[ key ];
  } );
  let colors = [
    '#d7eae5', '#80cdc1', '#01665e',
    '#268BD2', '#2aa198', '#2bbb98'
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

  // Define SVG area dimensions
  // var svgWidth = 600;
  // var svgHeight = 220;
  var svgWidth = window.innerWidth*.4;
  var svgHeight = svgWidth * .75;

  // Define the chart's margins as an object
  var chartMargin = {
    top: 30,
    right: 30,
    bottom: 50,
    left: 20
  };

  var margin = {
    top: 30,
    right: 30,
    bottom: 30,
    left: 50
  };
  var chartWidth = svgWidth - margin.left - margin.right;
  var chartHeight = svgHeight - margin.top - margin.bottom;

  var svg = d3
    .select( "#bar-chart-horizontal" )
    .append( "svg" )
    .attr( "height", svgHeight )
    .attr( "width", svgWidth );
    
  var chartGroup = svg.append( "g" )
    .attr( "transform", `translate(${margin.left}, ${margin.top})` );

    
  // Define dimensions of the chart area
  var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
  var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;
  
  const labels = [ "Active", "Confirmed", "Recovered", "Tested", "Deaths", "Hospitalized" ];

  // scale x to chart
  var yScale = d3.scaleBand()
  .domain( labels )
  .range( [ 0, chartHeight ] );
  
  var values = dictArray.map( d => d.value );
  console.log(d3.max( values ));
  // scale y
  var xScale = d3.scaleLinear()
  .domain( [ 0, d3.max( values ) ] )
  .range( [ chartWidth, 0 ] )
  ;
  
  // console.log( 'object :>> ', xScale( 100000 ) );

  var yAxis = d3.axisLeft( yScale );
  var xAxis = d3.axisBottom( xScale );
  
  chartGroup.append( "g" )
  .attr( "class", "axisGold" )
  .attr( "transform", `translate(0, ${chartHeight})` )
  .call( xAxis )
  .selectAll("text")
  .style("font-size", "8px")
  .style("text-anchor", "end")
  .attr("dx", "-.8em")
  .attr("dy", "-.55em")
  .attr("transform", "rotate(-90)" )
  ;
  // .attr("transform", "rotate(-90)" )
  
  chartGroup.append( "g" )
  .attr( "class", "axisGold" )
  .call( yAxis );

  // console.table( labels );
  // console.log(dictArray);
  const labelsV1 = ["Active","Confirmed", "Recovered",  "Tested", "Deaths",  "Hospitalized" ];

  chartGroup.selectAll( ".bar" )
    .data( dictArray )
    .enter()
    .append( "rect" )
    .attr( "class", "bar" )
    .attr("fill",d=> d.color)
    .attr( "y", ( d, i ) => yScale( labelsV1[ i ] ) )
    .attr( "x", 0)
    .attr( "height", yScale.bandwidth() )
    .attr( "width", d => chartWidth - xScale( d.value ) )
    .transition()
    .duration(2000)
    ;

}
