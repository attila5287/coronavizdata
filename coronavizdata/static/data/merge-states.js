// console.log('statesData :>> ', statesData);
var url = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports_us/05-17-2020.csv';
var url2 = './static/data/states,csv';

d3.csv(url,
(error, csvData) => {
   if (error) {
       console.error(error);
   } else {
       let dictDeaths = {};
       for (let index = 0; index < csvStateNames.length; index++) {
           const name = csvStateNames[index];
           const row = csvData[index]; 
           dictDeaths[name] = +row.Deaths;
       }
        


       
       statesData.features.forEach(stateJSON => {
           stateJSON.properties['deaths'] = dictDeaths[stateJSON.properties.name]
        });
        console.log('statesData :>> ', statesData);
        
    }



});    

