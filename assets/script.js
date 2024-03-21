var cityName= document.querySelector('#citySearchInput');
var searchBtn= document.querySelector('#searchBtn');

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
            console.log(response);
            response.json().then(function(data){
                console.log(data[0].name);
                console.log(data[0].lat);
                console.log(data[0].lon);
                var lat=data[0].lat;
                var lon=data[0].lon;
                let chosenCity=data[0].name;

                weatherURL=`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIkey}&units=imperial`;
                
                fetch(weatherURL).then(function(response){
                    if (response.ok) {
                        console.log(response);
                        response.json().then(function (data){
                            console.log(data);
                            var weatherStats=data.list;
                            console.log(weatherStats);

                        });
                    }
                });








            });
        } 
        else {
            alert(`City not Found!`);
        }
    });

};
