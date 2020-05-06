// Dropdown plugin data

var countrySelect = document.getElementById("ddSlick");

var url = 'https://pomber.github.io/covid19/timeseries.json';

d3.json(url, function(error, data) {
  if (error) throw error;

  function dropDownUpdate(){
    

  const keys = Object.keys(data);
  console.log(keys);
  const format = d3.format( ',' );

  const ddJSON = keys.map((country, i) => {

    return {
        text: country,
        value: i,
         selected: false,
        description: `deaths: ${format(data[country][data[country].length-1].deaths)} | confirmed: ${format(data[country][data[country].length-1].confirmed)}`,
        imageSrc: '/static/img/flags/Ensign_Flag_Nation_'+country.toLowerCase().replace(' ','_')+'-128.png'
    };
    
  });

  console.log(ddJSON);
  

  $('#opts').ddslick({
    data: ddJSON,
    width: 360,
    height: 280,
    onSelected: function (data) {
      console.log(data)
    }});
  }
    
  })    




