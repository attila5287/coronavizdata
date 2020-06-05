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
numBoxUp( dTest, 0 );
vizBoxUp( dTest, 0 );

function vizBoxUp( d, i ) {

  console.log( d );
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
  const dictArray = [];
  let colors = [
    '#d7eae5', '#80cdc1', '#01665e',
    '#268BD2', '#2aa198', '#2bbb98'
  ];
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
  var svgWidth = window.innerWidth;
  var svgHeight = svgWidth * .33;

  // Define the chart's margins as an object
  var chartMargin = {
    top: 30,
    right: 30,
    bottom: 30,
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
  var xScale = d3.scaleBand()
  .domain( labels )
  .range( [ 0, chartWidth ] );
  
  var values = dictArray.map( d => d.value );
  // scale y
  var yScale = d3.scaleLinear()
  .domain( [ 0, d3.max( values ) ] )
  .range( [ chartHeight, 0 ] );
  
  console.log( 'object :>> ', yScale( 100000 ) );
  var yAxis = d3.axisLeft( yScale );
  var xAxis = d3.axisBottom( xScale );
  
  chartGroup.append( "g" )
  .attr( "transform", `translate(0, ${chartHeight})` )
  .attr( "class", "axisGold" )
  .call( xAxis );
  
  chartGroup.append( "g" )
  .attr( "class", "axisGold" )
  .call( yAxis );

  console.table( labels );


  chartGroup.selectAll( ".bar" )
    .data( dictArray )
    .enter().append( "rect" )
    .attr( "class", "bar" )
    .attr( "x", ( d, i ) => xScale( labels[ i ] ) )
    .attr( "y", d => yScale( d.value ) )
    .attr( "width", xScale.bandwidth() )
    .attr( "height", d => chartHeight - yScale( d.value ) );
}
