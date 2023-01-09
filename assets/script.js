var button = document.querySelector('.btn');
var inputValue = document.querySelector('.inputValue');
var cityName = document.querySelector('.cityName');
var icon = $('#icon');
var temperature = document.querySelector('.temp');
var windSpeed = document.querySelector('.windSpeed');
var humidity = document.querySelector('.humidity');


function searchCity() {

    fetch('https://api.openweathermap.org/geo/1.0/direct?q='+inputValue.value+'&appid=232b6c46052204d8ef059e1facae5a19')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {           
            var latitud = data[0].lat;
            var longitud = data[0].lon;

            fetch('https://api.openweathermap.org/data/2.5/weather?lat=' + latitud + '&lon=' + longitud + '&appid=232b6c46052204d8ef059e1facae5a19&units=imperial')
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {              
                var nameValue = data['name'];
                var tempValue = data['main']['temp'];
                var iconValue = data['weather'][0]['icon'];
                var iconUrl = 'https://openweathermap.org/img/wn/'+iconValue+'.png';                              
                icon.attr('src', iconUrl);
                icon.attr('alt','Weather Icon')
                var windSpeedValue = data['wind']['speed'];
                var humidityValue = data['main']['humidity'];
                
                cityName.innerHTML = nameValue;
                $('#currentDay').text(dayjs().format('MM/D/YYYY'));               
                temperature.innerHTML = 'Temp: ' + tempValue + ' °F';
                // icon.innerHTML =  'http://openweathermap.org/img/wn/'+iconValue+'@2x.png'
                windSpeed.innerHTML = 'Wind: ' + windSpeedValue + ' mph';
                humidity.innerHTML = 'Humidity: ' + humidityValue;
            })
        })



        .catch(err => alert("Wrong city name!"))
    forecast();

}

function forecast(){
    var forecastTitle = document.querySelector('.forecast')

    forecastTitle.innerHTML = "5-Day Forecast"

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
            
        })
    })
        
  

}

button.addEventListener('click',searchCity);
