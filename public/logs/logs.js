
const mymap = L.map('checkinMap').setView([0, 0], 1);  //create Map Object       

const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'; //get attribution
const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'; //URL to подложката (tiles) from Leflet
const tiles = L.tileLayer(tileUrl, {attribution}); //create a Layer
tiles.addTo(mymap);  // add the layer to mymap




getData();

        async function getData(){
            const response = await fetch("/api");
            const data = await response.json();
            
            for(item of data){
                const marker = L.marker([item.lat, item.lon]).addTo(mymap);
                let txt = `The weather here at ${item.lat}&deg; ${item.lon}&deg (${item.air.city}) is ${item.weather.condition.text} with a tempeture of ${item.weather.temp_c}&deg C.`;
                
                if(item.air.value<0){
                    txt+= " But NO air quality reading!!!"; 

                }else{
                    txt+= `The concentration of particulate matter (${item.air.parameter}) is ${item.air.value}${item.air.unit} last read on ${item.air.date.utc} UTC`;
                }               

               marker.bindPopup(txt);

                //****next is from precious tutorials */
            //     const root = document.createElement('p');
            //    // const mood = document.createElement('div');
            //     const geo = document.createElement('div');
            //     const date = document.createElement('div');
            //    // const image = document.createElement('img'); //create img tag


            //     const hr = document.createElement('hr');

            //    // mood.textContent = `mood: ${item.mood}`;
            //     geo.textContent = `${item.lat}°, ${item.lon}°`;

            //     const dateString = new Date(item.timestamp).toLocaleDateString();
            //     date.textContent = dateString;                

            //     root.append(geo, date, hr);
            //     document.body.append(root);
                
            }
            console.log(data);
        }