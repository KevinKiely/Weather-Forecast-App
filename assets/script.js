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

    coordinatesURL=`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${APIkey}`;

    fetch(coordinatesURL)
    .then(function(response){
        if(response.ok) {
            return response.json();
        } 
    })
    .then(function(data){
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

        for (var i=8; i < 40; i +=8) {
            //New Card, one per day for the next 4 days
            var forecastCard= document.createElement('card');
            forecastCard.classList= 'text-light bg-dark';

            // Adding Date and forecast information, appending to cards
            var nextDay= document.createElement('h6');
            nextDay.textContent=weatherStats[i].dt_txt;
            nextDay.classList= 'text-light bg-dark fs-2';
            forecastCard.appendChild(nextDay);
            

            var nextDayTemp= document.createElement('p');
            nextDayTemp.textContent=weatherStats[i].main.temp;
            nextDayTemp.classList= 'text-light bg=dark fs=4';
            forecastCard.appendChild(nextDayTemp);



            fourDayForecast.appendChild(forecastCard);





        }


        
    })
};
