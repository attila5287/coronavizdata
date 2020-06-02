console.log(' --- complete bar chart from snippet ---');

var svg = d3
  .select("#svg-area")
  .append("svg")
   .style('background-color', '#2aa198')
  .attr("height", 250)
  .attr("width", 500);

// Template from https://bl.ocks.org/mbostock/3885304
var svg = d3.select("svg"),
    margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = +svg.attr("width") - margin.left - margin.right,
    height = +svg.attr("height") - margin.top - margin.bottom;

//Generates a categorical x axis and a numeric y axis
var x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
    y = d3.scaleLinear().rangeRound([height, 0]);

//Generates chart container that is adjusted by margin parameters
var g = svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


    //Reads data from tsv
    d3.csv("../static/data/states.csv",
   function(d) {
     d.Active = +d.Active;
     d.Confirmed = +d.Confirmed;
     d.Recovered = +d.Recovered;
     d.People_Tested = +d.People_Tested;
     d.Deaths = +d.Deaths;
     d.People_Hospitalized = +d.People_Hospitalized;            
  return d;
}, function(error, data) {
  if (error) throw error;
console.table(data);
  let ind3x = 6;
  let d = data[ind3x];
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
      return format(d[key]);  
  });
  //Sets categorical x domain based on given column
  x.domain(zKeys);
  y.domain(zValues);

  //Draw x axis and adjust for container size
  g.append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));
  //Draw y axis with various styling and transforms
  g.append("g")
      .attr("class", "axis axis--y")
      .call(d3.axisLeft(y).ticks(10, "%"))
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", "0.71em")
      .attr("text-anchor", "end")
      .text("hours");
  //Draw bars for each name and hours in data
  g.selectAll(".bar")
    .data(d)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.Province_State); })
      .attr("y", function(d) { return y(d.Deaths); })
      .attr("width", x.bandwidth())
      .attr("height", function(d) { return height - y(d.Deaths); });//draws bars on screen from top to bottom
});
