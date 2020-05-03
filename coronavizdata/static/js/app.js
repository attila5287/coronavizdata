// from data.js
var tableData = data;

// Get references to the tbody element, input field and button
var $tbody = document.querySelector("tbody");
var $dateInput = document.querySelector("#dateInput");
var $cityInput = document.querySelector("#cityInput");
var $stateInput = document.querySelector("#stateInput");
var $countryInput = document.querySelector("#countryInput");
var $shapeInput = document.querySelector("#shapeInput");
var $submitBtn = document.querySelector("#submit");


// renderTable 
function renderTable() {
    $tbody.innerHTML = "";
    for (var i = 0; i < tableData.length; i++) {
      // Get  the sightings object and its fields
      var CurrentSighting = tableData[i];
      var fields = Object.keys(CurrentSighting);
      // Create a new row in the tbody, set the index to be i + startingIndex
      var $row = $tbody.insertRow(i);
      for (var j = 0; j < fields.length; j++) {

        // For every field in the CurrentSighting object, create a new cell at set its inner text to be the current value at the current sightings field
        
        var field = fields[j];
        var $cell = $row.insertCell(j);
        $cell.innerText = CurrentSighting[field];
      }
    }
}
  
  
  // Add an event listener to the Submit Button
  $submitBtn.addEventListener("click", filterInput);
  
  function filterDate(filteredSighting) {
    return filteredSighting.datetime == $dateInput.value.trim().toLowerCase();
  };
  
  function filterCity(filteredSighting) {
    return filteredSighting.city == $cityInput.value.trim().toLowerCase();
  };
  
  function filterState(filteredSighting) {
    return filteredSighting.state == $stateInput.value.trim().toLowerCase();
  };
  
  function filterCountry(filteredSighting) {
    return filteredSighting.country == $countryInput.value.trim().toLowerCase();
  };
  
  function filterShape(filteredSighting) {
    return filteredSighting.shape == $shapeInput.value.trim().toLowerCase();
  };
  
  function filterInput() {
  
    // Reseting data set 
    tableData = data;
  
    // filters
    if ($dateInput.value) {
        tableData = tableData.filter(filterDate);
    };
  
    if ($cityInput.value) {
        tableData = tableData.filter(filterCity);
    };
  
    if ($stateInput.value) {
        tableData = tableData.filter(filterState);
    };
  
    if ($countryInput.value) {
        tableData = tableData.filter(filterCountry);
    };
  
    if ($shapeInput.value) {
        tableData = tableData.filter(filterShape);
    };
    $dateInput.value = "";
    $cityInput.value = "";
    $stateInput.value = "";
    $countryInput.value = "";
    $shapeInput.value = "";
  
    renderTable();
  };
  
  // Render the table for the first time on page load
  renderTable();
  