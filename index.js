const { request, response } = require('express');
const express = require('express');
const Datastore = require('nedb'); //***create an variable DB - call the second dependancy

require('dotenv').config();  //add dotenv  - глобални променливи за да скрием key-tata
//console.log(process.env);  //just for test

const fetch = require('node-fetch')//  add new object - node-fetch за да може да използваме на сътвъра fetch function; must install- npm install node-fetch@2.0


const app = express();
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listennig at ${port}!!!`));

app.use(express.static('public'));

//****************next post data to server***********************
app.use(express.json({ limit: '1mb' }));

const database = new Datastore('database.db'); //****create new objec/ - за да може да ползваме методи и свойства
database.loadDatabase(); //create a file in the folder project-database.db
//database.insert({ name: 'Vasil', state: 'BBBBBBB' }); //test to insert
//database.insert({ name: 'Vasil', state: 'BBBBBBB' }); //test to insert data

app.get('/api', (request, response)=>{
    //response.json({test:1234})  //test
    database.find({}, (err, data)=>{
        if(err){
            response.end();
            return;
        }
        response.json(data)
    });
    
});

app.post('/api', (request, response) => {
    console.log('I have got a request!');

    const data = request.body; //  prepare server response 
    const timestamp = Date.now() // създаваме още една данна за времето на submit
    data.timestamp = timestamp;
    database.insert(data);
    //console.log(database);
    response.json({
        status: 'succsess',
        timestamp: timestamp, //add to response
        latitude: data.lat,
        longtitude: data.lon        
    });

});
    let city;   //за второо api  - global var

    app.get('/weather/:latlon', async (request, response) => {
        
        //request part
        console.log(request.params);
        const latlon = request.params.latlon.split(',');
        console.log(latlon)
        const lat = latlon[0];
        const lon = latlon[1];
        console.log(lat,lon);

        //response part
        //const weather_url = `http://api.weatherapi.com/v1/current.json?key=c1667871e49c43d897092639213010&q=${lat}, ${lon}&aqi=yes`; //+ air_quality_info
        //const api_key = 'c1667871e49c43d897092639213010&q'; //we can change it s глобална променлиева - next line
        const api_key = process.env.API_KEY;

        const weather_url = `http://api.weatherapi.com/v1/current.json?key=${api_key}=${lat}, ${lon}`;
        //const weather_url = `http://api.weatherapi.com/v1/current.json?key=c1667871e49c43d897092639213010&q=52.520007,13.404954`;  //hard coded 
        const weather_response = await fetch(weather_url);
        const weather_data = await weather_response.json();

        city = weather_data.location.name; 

        const aq_url = `https://api.openaq.org/v1/measurements?city=${city}`;  
        const aq_response = await fetch(aq_url);
        const aq_data = await aq_response.json();

        const data={
            weather: weather_data,
            air_quality: aq_data
        };
        
        response.json(data);        
        console.log(city);  


    });
