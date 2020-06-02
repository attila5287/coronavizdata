const format = d3.format( ',' );
// iState is index of state csv table i.e. 6 for Colorado 
  let indexState = 6;
  // will disp
  let colors = [
  '#c7eae5', '#80cdc1', '#01665e',
  '#762a83', '#9970ab', '#c2a5cf'
];
// Define SVG area dimensions
var svgWidth = 500;
var svgHeight = 260;

// Define the chart's margins as an object
var chartMargin = {
  top: 30,
  right: 30,
  bottom: 30,
  left: 30
};

// Define dimensions of the chart area
var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;

// Select body, append SVG area to it, and set the dimensions
var svg = d3
  .select("#bar-chart-horizontal")
  .append("svg")
  .attr("height", svgHeight)
  .attr("width", svgWidth);

// Append a group to the SVG area and shift ('translate') it to the right and to the bottom
var chartGroup = svg.append("g")
  .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);

// Load data from hours-of-tv-watched.csv
d3.csv("../static/data/states.csv", function(error, csvData) {
  if (error) throw error;
  let d = csvData[indexState];

  console.log(csvData);
    let z = {};
    z.Active = +d.Active;
    z.Confirmed = +d.Confirmed;
    z.Recovered = +d.Recovered;
    z.People_Tested = +d.People_Tested;
    z.Deaths = +d.Deaths;
    z.People_Hospitalized = +d.People_Hospitalized;            
    // console.table(z);
    const zKeys = Object.keys(z);
    let listOfValues = [];
    const zValues =  zKeys.map((key) => {
       return +d[key];  
    });
      
    console.log('zValues :>> ', zValues);
    console.log('zKeys :>> ', zKeys);
    
  const zKeysv1 = ["Active","Confirmed", "Recovered",  "Tested", "Deaths",  "Hospitalized" ];
  
  const dictArray = [];

  for (let i = 0; i < zKeysv1.length; i++) {
    let dict = {
      name:'',
      value:0
    };
    dict.name=zKeysv1[i];
    dict.value=+z[zKeysv1[i]];
    dictArray.push(dict);
  }

  console.log(dictArray);

  // Configure a band scale for the horizontal axis with a padding of 0.1 (10%)
  var xBandScale = d3.scaleBand()
    .domain(zKeysv1)
    .range([0, chartWidth])
    .padding(0.1);
 
  // Create a linear scale for the vertical axis.
  var yLinearScale = d3.scaleLinear()
    .domain([0, (dictArray[1].value)])
    .range([chartHeight, 0]);

  // Create two new functions passing our scales in as arguments
  // These will be used to create the chart's axes
  var bottomAxis = d3.axisBottom(xBandScale);
  var leftAxis = d3.axisLeft(yLinearScale).ticks(10);

  // Append two SVG group elements to the chartGroup area,
  // and create the bottom and left axes inside of them
  chartGroup.append("g")
    .attr("class", "axisGold")
    .call(leftAxis);

  chartGroup.append("g")
    .attr("transform", `translate(0, ${chartHeight})`)
    .attr("class", "axisGold text-robo")
    .call(bottomAxis);

  // Create one SVG rectangle per piece of csvData
  // Use the linear and band scales to position each rectangle within the chart
  console.log('dictArray :>> ', dictArray);
  chartGroup.selectAll(".bar")
    .data(dictArray)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("fill", "#B58900")
    .attr("x", d => xBandScale(d.name))
    .attr("y", d => yLinearScale(+d.value))
    .attr("width", xBandScale.bandwidth())
    .attr("height", d => chartHeight - yLinearScale(d.value));

});
