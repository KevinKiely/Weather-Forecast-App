var cityName= document.querySelector('#citySearchInput');
var searchBtn= document.querySelector('#searchBtn');
var dateOne= document.querySelector('#date-one');
var infoOne= document.querySelector('#info-one');
var fourDayForecast= document.querySelector('#four-day-forecast');

const APIkey= "65bffcd5cc2e4aefbd78b08c160f7d07";

var lat='';
var lon='';


weatherURL=`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIkey}`;


searchBtn.addEventListener('click',findCity);

function findCity() {
    console.log(cityName.value)
    var city=cityName.value;
    // Add to local storage AND the Search Container

    // We initialize a HOLDER variable
    var savedCities;
    // We CHECK for exisiting data
    if(!localStorage.getItem('cities')) {
        // NO SAVED data --> Initialize Dataset
        localStorage.setItem('cities', JSON.stringify([]));  // "[]"
        savedCities = [];
    } else {
        // if data EXISTS --> GRAB saved JSON data --> PARSE (Convert) the JSON into JavaScript (just cause it is easier to use)
       // savedCities = JSON.parse(localStorage.getItem('cities'));
        var jsonCitites = localStorage.getItem('cities');
        savedCities = JSON.parse(jsonCitites);
    }
    // Parse 

    // -- check state -- //
    console.log("History: ", savedCities);
    console.log("Type: ", typeof savedCities);
    
    // NOW we can ADD / Remove / MODIFY the (JAVASCRIPT) data
    savedCities.push(city);
    
    // -- check state -- //
    console.log("History: ", savedCities);
    console.log("Type: ", typeof savedCities);

    // WE HAVE TO SAVE THE NEW DATA BACK TO LOCAL STORAGE
    localStorage.setItem('cities', JSON.stringify(savedCities));

    coordinatesURL=`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${APIkey}`;
    // we are making an ASYNC request --> Event Loop --> 
    fetch(coordinatesURL)  // --> Returns A PROMISE  asyncOperation().then(data).catch(error)
    .then(function(response){
        console.log("Response Object: ", response)  // is NOT our data yet --> but the PROMISE to pass it along (DATASTREAM)
        if(response.ok) {  // response.status == 200
            return response.json();
        } 
    })
    .then(function(data){  // the 'data' paramter is our RETURNED DATASET
        var lat = data[0].lat;
        var lon = data[0].lon;
        weatherURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIkey}&units=imperial`;
        return fetch(weatherURL);
    })
    .then(function(response) {
        if(response.ok) {
            return response.json();
        } 
    })
    .then(function(data) {
        console.log(data);
        var chosenCity = data.city.name;
        var today = data.list[0].dt_txt;

        // clearout the previous data
       // infoOne.textContent = "";
        infoOne.innerHTML = "";
        // .remove()

        // This is the forecast information for today
        dateOne.textContent = `${chosenCity},${today}`;

        var tempOne= document.createElement('li');
        var windOne= document.createElement('li');
        var humidityOne= document.createElement('li');

        tempOne.textContent= `Temperature: ${data.list[0].main.temp} degrees `;
        windOne.textContent= `Windspeed: ${data.list[0].wind.speed} mph`;
        humidityOne.textContent= `Humidity: ${data.list[0].main.humidity}%`;

        infoOne.append(tempOne);
        infoOne.append(windOne);
        infoOne.append(humidityOne);



        // This is the forecast information for the next 4 days
        var weatherStats = data.list;
        console.log(weatherStats);
        fourDayForecast.textContent='';

        for (var i=7; i < 40; i +=8) {
            //New Card, one per day for the next 4 days
            var forecastCard= document.createElement('card');
            forecastCard.classList= 'text-light bg-dark m-3';

            // Adding Date and forecast information, appending to cards
            var nextDay= document.createElement('h6');
            nextDay.textContent=weatherStats[i].dt_txt;
            nextDay.classList= 'text-light bg-dark fs-2';
            forecastCard.appendChild(nextDay);

            // Adding Temperature information to the forecast
            var nextDayTemp= document.createElement('p');
            nextDayTemp.textContent=`Temperature: ${weatherStats[i].main.temp} Degrees`;
            nextDayTemp.classList= 'text-light bg-dark fs-4';
            forecastCard.appendChild(nextDayTemp);

            //Adding Windspeed information to the forecast
            var nextDayWind= document.createElement('p');
            nextDayWind.textContent=`Windspeed: ${weatherStats[i].wind.speed} MPH`;
            nextDayWind.classList= 'text-light bg-dark fs-4';
            forecastCard.appendChild(nextDayWind);

            // Adding Humidity information to the forecast
            var nextDayHumidity= document.createElement('p');
            nextDayHumidity.textContent=`Humidity: ${weatherStats[i].main.humidity}%`;
            nextDayHumidity.classList='text-light bg-dark fs-4';
            forecastCard.appendChild(nextDayHumidity);
            
            fourDayForecast.appendChild(forecastCard);
        }
    })

    // this is code AFTER the ASYNC REQuest
    // This code would run before we got our RESPONSE back

};
