function renderDynamicTable( rows ) {
  // console.log('--- rows ----');
  // console.log(rows);

  const $thead = document.querySelector( "thead" );
  $thead.innerHTML = "";
  let inner = "";
  var headers = Object.keys( rows[ 0 ] );
  // console.log(headers);
  for ( var j = 0; j < headers.length; j++ ) {
    var header = headers[ j ];
    inner += '<th>' + header + '</th>';
  }
  $thead.innerHTML += inner;

  const $tbody = document.querySelector( "tbody" );
  const format = d3.format( ',' );
  $tbody.innerHTML = "";
  for ( var i = 0; i < rows.length; i++ ) {
    // Get  the sightings object and its fields
    var currentRow = rows[ i ];
    var fields = Object.keys( currentRow );
    // Create a new row in the tbody, set the index to be i + startingIndex
    var $row = $tbody.insertRow( i );
    for ( var j = 0; j < 1; j++ ) {
      
      var field = fields[ j ];
      var $cell = $row.insertCell( j );
      var $img = document. createElement("img");
      $img.src = currentRow[field];
      $img.class="img-thumbnail";
      $img.alt=+" thumbnail";
      $img.style="height: 4rem;";
      $cell.appendChild($img);

    }
    for ( var j = 1; j < 3; j++ ) {
      var field = fields[ j ];
      var $cell = $row.insertCell( j );
        $cell.innerText = currentRow[ field ];
        $cell.innerText = currentRow[ field ];
        
    }
    for ( var j = 3; j < fields.length; j++ ) {

      var field = fields[ j ];
      var $cell = $row.insertCell( j );
         $cell.innerText = currentRow[ field ];
        $cell.innerText = format(currentRow[ field ])
        ;
    }        
  }
}
function prepDataFromCSV(csv){
  const newRows = csv.map(function(d) { 
    return {
      Flag: '/static/img/states/' + d.Province_State.toLowerCase().replace( ' ', '-' ) + '-flag-small.png',
      Province_State: d.Province_State,
      Country_Region: d.Country_Region,
      Active : +d.Active,
      Confirmed : +d.Confirmed,
      Deaths : +d.Deaths,
      People_Hospitalized : +d.People_Hospitalized,
      Recovered:+d.Recovered
    };

    });  
  return newRows;  
}

// const urlStatic = '../static/data/states.csv'
// d3.csv( urlStatic,
//     ( error, data ) => {
//         if ( error ) {console.error( error );} else {
//             renderDynamicTable(prepDataFromCSV(data));

//         }
//     } );
