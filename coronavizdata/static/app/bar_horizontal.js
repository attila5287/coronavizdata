// Dataset we will be using to set the height of our rectangles



// Setting variable for height and width for ease of calculations
var svgHeight = 800;
var svgWidth = 800;


var arr = Array.from(Array(100).keys()).map((item) => {
  return item*7 
});
;


// Append an SVG wrapper to the page and set a variable equal to a reference to it
var svg = d3.select("#svg-area-barh")
  .append("svg")
    .attr("height", svgHeight)
    .attr("width", svgWidth)
    .style("background-color", 'black')
    .style("margin", '1rem')
    .style("padding", '2rem');

// // Vertical Bar Chart
// // Selects all rectangles currently on the page - which is none - and binds our dataset to them. If there are no rectangles, it will append one for each piece of data.
svg.selectAll("rect")
  .data(arr)
  .enter()
  .append("rect")
  .classed("bar", true)
  .attr("height", svgHeight/arr.length/1.25)
//   // Setting the height of our rectangles now uses an anonymous function that selects a single piece of data from our dataset and multiplies it by 10
  .attr("width", function(d) {
    return d+50;
  })
// //   // Setting the height of our rectangles now uses an anonymous function that selects a single piece of data from our dataset and multiplies it by 10
  .attr("x", 0)
  .attr("y", function(d, i) {
    return i * svgHeight/arr.length;
  })
  ;
