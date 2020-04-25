// user will select country from Select element thus the dynamic dashboard update
var $countrySelect = document.getElementById("opts");

overallFiguresUp();
function overallFiguresUp() {
  url = "https://coronavirus-tracker-api.herokuapp.com/v2/locations";
  d3.json(url, function (error, data) {
    if (error)
      throw error;
    var format = d3.format(",");
    d3.select('#overallDeath').text(format(data['latest']['deaths']));
    d3.select('#overallConfirmed').text(format(data['latest']['confirmed']));
  });
}

