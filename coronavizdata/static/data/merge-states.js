// console.log('statesData :>> ', statesData);
var url = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports_us/05-17-2020.csv';
var url2 = './static/data/states,csv';

d3.csv(url,
(error, csvData) => {
   if (error) {
       console.error(error);
   } else {
       let dictDeaths = {};
       let dictConfirmed = {};
       for (let index = 0; index < csvStateNames.length; index++) {           
           const name = csvStateNames[index];
           const row = csvData[index]; 
           dictDeaths[name] = +row.Deaths;
           dictConfirmed[name] = +row.Confirmed;
       }
       statesData.features.forEach(stateJSON => {
           stateJSON.properties['deaths'] = dictDeaths[stateJSON.properties.name]
        });
        console.log('statesData AFTER :>> ', statesData);

var mapboxAccessToken = "pk.eyJ1IjoiYXR0aWxhNTIiLCJhIjoiY2thOTE3N3l0MDZmczJxcjl6dzZoNDJsbiJ9.bzXjw1xzQcsIhjB_YoAuEw";
var map = L.map('map').setView([37.8, -96], 4);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=' + mapboxAccessToken, {
    id: 'mapbox/dark-v10',
    attribution: '<a href="https://www.openstreetmap.org/"> @attila5287 </a> Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' 
    + 'Imagery © '+'<a href="https://www.mapbox.com/">Mapbox</a>',		
    tileSize: 512,
    zoomOffset: -1
}).addTo(map);


// Adding colorBrewer colors
function getColor(d) {
    return d > 1000 ? '#deebf7' :
           d > 500  ? '#f7fbff' :
           d > 200  ? '#c6dbef' :
           d > 100  ? '#9ecae1' :
           d > 50   ? '#6baed6' :
           d > 20   ? '#4292c6' :
           d > 10   ? '#2171b5' :
                      '#084594';
}

// feature fill colors gets colors from obj-prop-deaths value
function style(feature) {
    return {
        fillColor: getColor(feature.properties.deaths),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
}

// Adding Interaction
function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });

    info.update(layer.feature.properties);    
}
function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
}

function resetHighlight(e) {
    geojson.resetStyle(e.target);
    info.update();
}
function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
    });
}

var info = L.control();

info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};
info.update = function (props) {
    this._div.innerHTML = '<h4>US Population Density</h4>' +  (props ?
        '<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>'
        : 'Hover over a state');
};
info.addTo(map);

var legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 10, 20, 50, 100, 200, 500, 1000],
        labels = [];

    // loop through our deaths intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }

    return div;
};

legend.addTo(map);

geojson = L.geoJson(statesData, {
    style: style,
    onEachFeature: onEachFeature
}).addTo(map);



console.log('statesData :>> ', statesData);

var mapboxAccessToken = "pk.eyJ1IjoiYXR0aWxhNTIiLCJhIjoiY2thOTE3N3l0MDZmczJxcjl6dzZoNDJsbiJ9.bzXjw1xzQcsIhjB_YoAuEw";
var map = L.map('map').setView([37.8, -96], 4);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=' + mapboxAccessToken, {
    id: 'mapbox/dark-v10',
    attribution: '<a href="https://www.openstreetmap.org/"> @attila5287 </a> Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' 
    + 'Imagery © '+'<a href="https://www.mapbox.com/">Mapbox</a>',		
    tileSize: 512,
    zoomOffset: -1
}).addTo(map);


// Adding colorBrewer colors
function getColor(d) {
    return d > 1000 ? '#deebf7' :
           d > 500  ? '#f7fbff' :
           d > 200  ? '#c6dbef' :
           d > 100  ? '#9ecae1' :
           d > 50   ? '#6baed6' :
           d > 20   ? '#4292c6' :
           d > 10   ? '#2171b5' :
                      '#084594';
}

// feature fill colors gets colors from obj-prop-deaths value
function style(feature) {
    return {
        fillColor: getColor(feature.properties.deaths),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
}

// Adding Interaction
function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });

    info.update(layer.feature.properties);    
}
function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
}

function resetHighlight(e) {
    geojson.resetStyle(e.target);
    info.update();
}
function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
    });
}

var info = L.control();

info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};
info.update = function (props) {
    this._div.innerHTML = '<h4>US Population Density</h4>' +  (props ?
        '<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>'
        : 'Hover over a state');
};
info.addTo(map);

var legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 10, 20, 50, 100, 200, 500, 1000],
        labels = [];

    // loop through our deaths intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }

    return div;
};

legend.addTo(map);

geojson = L.geoJson(statesData, {
    style: style,
    onEachFeature: onEachFeature
}).addTo(map);




    }
});    

