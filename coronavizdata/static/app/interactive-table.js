const format = d3.format( ',' );
let  urlTest = "../static/data/states.csv";
const columnsDisplayed = ["Province_State", "Deaths", "Confirmed", "Recovered", "Active"];

tableInteractive(urlTest, columnsDisplayed);
// tableInteractive(urlCompiled, columnsDisplayed);

function tableInteractive(url,c0lumns) {
  // const format = d3.format( ',' );
  let columns = ['Flag'];
  c0lumns.forEach(element => {
    columns.push(element)
  });
  var table = d3.select( "#table-goes-here" )
    .append( "table" )
    .attr( "class", "table table-condensed table-striped table-hover text-center text-onerem  border-none" ), thead = table.append( "thead" ), tbody = table.append( "tbody" );
  
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
        numBoxUp( d, i );
        vizBoxUp( d, i );
      } )
      .on( "mouseout", function ( d ) {
        // console.log('d :>> ', d);
        d3.select( this )
          .attr( "class", "shadow-before" );
        d3.select('#num-box')
          .select('h2')
          .text('US States vs COVID-19');
          d3.select('#num-box')
          .select("img")
          .style("height","10rem")
          .attr("src", '/static/img/states/default.png')
          ;          
          d3.select('#bar-chart-horizontal')
            .select('svg')
            .remove();
        // vizBoxDown();

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

  function numBoxUp( d, i ) {
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
      
    // console.log('zValues :>> ', zValues);
    // console.log('zKeys :>> ', zKeys);
    
    const zKeysv1 = ["Active","Confirmed", "Recovered",  "Tested", "Deaths",  "Hospitalized" ];

    const cardTitles = d3
      .select( '#num-box' )
      .selectAll( '.card-title' )
      .data(zKeysv1)
      .text(function(d) {return d ;});
      
    const cardTexts = d3
      .select( '#num-box' )
      .selectAll( '.card-t3xt' )
      .data(zValues)
      .text(function(d) {return d ;});

    d3.select( '#num-box' )
      .select( 'h2' )
      .text( d.Province_State + " " + i );
    d3.select( '#num-box' )
      .select( "img" )
      .style( "height", "9rem" )
      .attr( "src", '/static/img/states/' + d.Province_State.trim().toLowerCase().replace( ' ', '-' ) + '-flag-small.png' );
  }

  function vizBoxUp( d, i ) {
  const format = d3.format( ',' );
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
      
    // console.log('zValues :>> ', zValues);
    // console.log('zKeys :>> ', zKeys);
    
  const zKeysv1 = ["Active","Confirmed", "Recovered",  "Tested", "Deaths",  "Hospitalized" ];
  
  const dictArray = [];


  let colors = [
  '#c7eae5', '#80cdc1', '#01665e',
  '#268BD2', '#2aa198', '#2bbb98'
  ];
  for (let i = 0; i < zKeysv1.length; i++) {
    let dict = {

      name:'',
      value:0
    };
    dict.name=zKeysv1[i];
    dict.value=+z[zKeys[i]];
    dict.color = colors[i];
    dictArray.push(dict);
  }

// console.log('vizBoxUp --> dictArray :>> ', dictArray);


// Define SVG area dimensions
var svgWidth = 600;
var svgHeight = 150;

// Define the chart's margins as an object
var chartMargin = {
  top: 30,
  right: 30,
  bottom: 30,
  left: 50
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
    .attr("fill",d=> d.color)
    .attr("x", d => xBandScale(d.name))
    .attr("y", d => yLinearScale(d.value))
    .attr("width", xBandScale.bandwidth())
    .attr("height", d => chartHeight - yLinearScale(d.value));

}
}
  
