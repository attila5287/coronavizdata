function prepRows( JSON ) {
  console.log( '--------- TABLE-EU ---------------- :>> ' );
  const format = d3.format( ',' );
  let abCodeByName = {},
    popByName = {};

  JSON.locations.forEach( d => {
    const name = d.country;
    popByName[ name ] = +d.country_population;
    abCodeByName[ name ] = d.country_code;
  } )

  // console.log('popByName :>> ', popByName);

  const groupedByDeaths = d3.nest()
    .key( function ( d ) {
      return d.country;
    } )
    .rollup( function ( v ) {
      return d3.sum( v, function ( d ) {
        return d.latest.deaths;
      } );
    } )
    .entries( JSON.locations );
  // console.log('groupedByDeaths :>> ', groupedByDeaths.length);

  const names = groupedByDeaths.map( ( d ) => d.key );

  const groupedByConfirmed = d3.nest()
    .key( function ( d ) {
      return d.country;
    } )
    .rollup( function ( v ) {
      return d3.sum( v, function ( d ) {
        return d.latest.confirmed;
      } );
    } )
    .entries( JSON.locations );
  // console.log('groupedByConfirmed :>> ', groupedByConfirmed.length);

  let deathsByName = {},
    confirmedByName = {};

  groupedByDeaths.forEach( d => {
    deathsByName[ d.key ] = +d.value;
  } )

  groupedByConfirmed.forEach( ( d ) => {
    
    confirmedByName[ d.key ] = +d.value;

  } )

// console.log('deathsByName :>> ', deathsByName);
// console.log('confirmedBy :>> ', confirmedByName);

// refresh memory: there are 266 entries but only 187 unique country names

const dataForAll = names.map(name => {
  return {
    'Flag' :'/static/img/flags/Ensign_Flag_Nation_' + name.toLowerCase().replace( ' ', '_' ) + '-128.png',
    'Name': name,
    'Code': abCodeByName[name],
    'Confirmed' : confirmedByName[name],
    'Deaths' : deathsByName[name],
  }
  ;
})

const dataForEurope = namesEurope.map(name => {
  return {
    'Flag' :'/static/img/flags/Ensign_Flag_Nation_' + name.toLowerCase().replace( ' ', '_' ) + '-128.png',
    'Name': name,
    'Code': abCodeByName[name],
    'Deaths' : deathsByName[name],
    'Confirmed' : confirmedByName[name],
    'Population' : popByName[name],
  }
  ;
})

let output = {
  all : dataForAll,
  europe:dataForEurope.sort(function(a, b){
    return b["Deaths"]-a ["Deaths"];
})
};
return output;
}
