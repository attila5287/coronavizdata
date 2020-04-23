// This is a d3 representation of the element
d3.select("h1");

// Select the text from the element
d3.select("h1").text();

// Modify the text
d3.select("h1").text("Hello World!");

// Select the div with a class
d3.select(".text1").text();

// Select the div with an id
d3.select("#text2").text(); 

// Select the link tag with a tag inside.
// Note: the a tag is in the object.
d3.select(".link");

// Show the html for the link div
d3.select(".link").html();

// search within the link div
d3.select(".link>a").text();

// pull out an attribute
d3.select(".link>a").attr("href");

// change an attribute and use chaining to change the text
d3.select(".link>a").attr("href", "https://d3js.org/").text("d3js.org");

// use chained searches for nested elements
d3.select(".deeplink").select("a").text();

// Show selectAll
d3.selectAll("li").nodes();

// Show setting a style on all nodes
d3.selectAll("li").style("background-color", "darkblue").style("color", "white");

// Show combining selectAll with select
d3.selectAll("div").select("a").nodes();
// Note: This selects all div tags and then all div tags with a tags inside. Due to nesting of divs, this returns 4 a tags

// Create a new element
var $li = d3.select("ul").append("li");
$li.text("Hi, I'm a new Item");
// or in one line
d3.select("ul").append("li").text("Hi, I'm a new Item");
