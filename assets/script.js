// create all global variables
var button = document.querySelector('.btn');
var inputValue = document.querySelector('.inputValue');
var cityName = document.querySelector('.cityName');
// used jquery to the the Icon from the webpage
var icon = $('#icon');
var temperature = document.querySelector('.temp');
var windSpeed = document.querySelector('.windSpeed');
var humidity = document.querySelector('.humidity');
var historyTitle = document.querySelector('.history');

// create a function to fetch the latitud and longitud of a city
function searchCity() {

    fetch('https://api.openweathermap.org/geo/1.0/direct?q='+inputValue.value+'&appid=232b6c46052204d8ef059e1facae5a19')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {           
            var latitud = data[0].lat;
            var longitud = data[0].lon;           
            

            // create a fetch to get the data for the current weather
            fetch('https://api.openweathermap.org/data/2.5/weather?lat=' + latitud + '&lon=' + longitud + '&appid=232b6c46052204d8ef059e1facae5a19&units=imperial')
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {  
                //create varibales to save the data we need to display 
                var nameValue = data['name'];
                var tempValue = data['main']['temp'];
                var iconValue = data['weather'][0]['icon'];
                var iconUrl = 'https://openweathermap.org/img/wn/'+iconValue+'.png';                              
                icon.attr('src', iconUrl);
                icon.attr('alt','Weather Icon')
                var windSpeedValue = data['wind']['speed'];
                var humidityValue = data['main']['humidity'];
                // assign those variable to show on the webpage
                cityName.innerHTML = nameValue;
                $('#currentDay').text(dayjs().format('MM/D/YYYY'));               
                temperature.innerHTML = 'Temp: ' + tempValue + ' °F';                
                windSpeed.innerHTML = 'Wind: ' + windSpeedValue + ' mph';
                humidity.innerHTML = 'Humidity: ' + humidityValue;                
            })
        })
        // get any error names a display and alert
        .catch(err => alert("Wrong city name!"))
    // call forecast funtion
    forecast();

}

var i = 1
function searchHistory(){
    
    var btnHistory = document.querySelector('.btnHistory-'+ i);
    var city = ['city-'+ i];
    var actualCity = [inputValue.value]
    localStorage.setItem(city,actualCity);

    historyTitle.innerHTML = "Recent Search"
    btnHistory.innerHTML = localStorage.getItem('city-'+ i)
    
    i++

}

function forecast(){
    var b = 2
    
    fetch('https://api.openweathermap.org/geo/1.0/direct?q='+inputValue.value+'&appid=232b6c46052204d8ef059e1facae5a19')
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        
        console.log(data)
        var latitud = data[0].lat;
        var longitud = data[0].lon;
        
        fetch('https://api.openweathermap.org/data/2.5/forecast?lat=' + latitud + '&lon=' + longitud + '&appid=232b6c46052204d8ef059e1facae5a19&units=imperial')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            for (var i = 1; i < 6; i++) {
                
                var icon = $('#icon-' + i);
                var temp = document.querySelector('.temp-' + i);
                var wind = document.querySelector('.windSpeed-' + i);
                var humidity = document.querySelector('.humidity-' + i);
                
                
                var tempValue = data['list'][(3*b)-i]['main']['temp'];
                var iconValue = data['list'][(3*b)-i]['weather'][0]['icon'];
                var iconUrl = 'https://openweathermap.org/img/wn/'+iconValue+'.png';                              
                icon.attr('src', iconUrl);
                icon.attr('alt','Weather Icon')
                var windSpeedValue = data['list'][(3*b)-i]['wind']['speed'];
                var humidityValue = data['list'][(3*b)-i]['main']['humidity'];

                var forecastTitle = document.querySelector('.forecast5Days')    
                forecastTitle.innerHTML = "5-Day Forecast"                
                
                $('.date-' + i).text(dayjs().add(i,'day').format('MM/D/YYYY'));               
                temp.innerHTML = 'Temp: ' + tempValue + ' °F';                
                wind.innerHTML = 'Wind: ' + windSpeedValue + ' mph';
                humidity.innerHTML = 'Humidity: ' + humidityValue;
                b = b + 3;
            }
            
            
            
        })
    })
    searchHistory();
   
    
    
}

    

button.addEventListener('click',searchCity);
btnHistory.addEventListener('click',searchCity);
