
//get GEO
let lat, lon, weather, air;

if ('geolocation' in navigator) {                
    console.log('geolocation is available');
    /* geolocation is available */  
    navigator.geolocation.getCurrentPosition(async position => {

    try{
        lat = position.coords.latitude;
        lon = position.coords.longitude;
        console.log(lat, lon);
        document.getElementById('lati').textContent = lat.toFixed(2)+'°';
        document.getElementById('long').textContent = lon.toFixed(2)+'°';
    
    const api_url = `weather/${lat},${lon}`;
    //const api_url = `/weather`;   //when we use constant lat, lon  - Paris for example
    const response = await fetch(api_url);
    const json = await response.json();
    console.log(json);

    weather = json.weather.current;
    const weather_city = json.weather.location.name;
    console.log(weather_city);
    air = json.air_quality.results[14];

    document.getElementById('summary').textContent = weather.condition.text;
    document.getElementById('temperature').textContent = weather.temp_c;
    document.getElementById('city').textContent = weather_city;

    document.getElementById('aq_parameter').textContent = air.parameter;
    document.getElementById('aq_value').textContent = air.value;
    document.getElementById('aq_unit').textContent = air.unit;
    document.getElementById('aq_date').textContent = air.date.utc;

    //console.log(json);    

    }catch(err){
        //console.error(err);
        console.log('Something went wrong!!!');
        air = {value:-1};

       // document.getElementById('aq_value').textContent = "No Reading!!!";
       // document.getElementById('aq_value').style.color='red';
    }    
        const data = {  //next to catch works as using da button - check-in - ane wi have to insert data to DBase
            lat,
            lon, 
            weather,           
            air       
        }; 
        const options = {               
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'                         
            },
            body: JSON.stringify(data) 
        };
        const db_response = await fetch('/api', options); 
        const db_data_res_json = await db_response.json();
        console.log(db_data_res_json);

    });

}else{
    console.log('geolocation is NOT available');
    /* geolocation IS NOT available */
}    
    // handle Button   -----> tutor 3.3 this next move to up in try
    //const butn = document.getElementById('checkin');
    //butn.addEventListener('click', async event=>{      
              

        // const data = {
        //     lat,
        //     lon
           
        // }; 
        // const options = {               
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'                         
        //     },
        //     body: JSON.stringify(data) 
        // };
        // const response = await fetch('/api', options); 
        // const data_res_json = await response.json();
        //console.log(data_res_json);   
    //});  
    

