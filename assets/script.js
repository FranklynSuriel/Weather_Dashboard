var button = document.querySelector('.btn');
var inputValue = document.querySelector('.inputValue');
var cityName = document.querySelector('.cityName');
var icon = document.querySelector('#icon');
var temperature = document.querySelector('.temp');
var windSpeed = document.querySelector('.windSpeed');
var humidity = document.querySelector('.humidity');


button.addEventListener('click', function () {

    fetch('http://api.openweathermap.org/geo/1.0/direct?q=' + inputValue.value + '&appid=232b6c46052204d8ef059e1facae5a19')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data)
            var latitud = data[0].lat;
            var longitud = data[0].lon;

            console.log(latitud);
            console.log(longitud);
            
            
            fetch('https://api.openweathermap.org/data/2.5/weather?lat=' + latitud + '&lon=' + longitud + '&appid=232b6c46052204d8ef059e1facae5a19&units=imperial')
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                console.log(data)
                var nameValue = data['name'];
                var tempValue = data['main']['temp'];
                var iconValue = data['weather'][0]['icon'];
                var iconUrl = 'http://openweathermap.org/img/wn/'+iconValue+'@2x.png'
                // icon.setAttribute('href', iconUrl)
                $('#icon').attr('src', iconUrl);
                var windSpeedValue = data['wind']['speed'];
                var humidityValue = data['main']['humidity'];
                
                
               
                
                cityName.innerHTML = nameValue;
                temperature.innerHTML = 'Temp: ' + tempValue + ' °F';
                // icon.innerHTML =  'http://openweathermap.org/img/wn/'+iconValue+'@2x.png'
                windSpeed.innerHTML = 'Wind: ' + windSpeedValue + ' mph';
                humidity.innerHTML = 'Humidity: ' + humidityValue;
            })
        })



        .catch(err => alert("Wrong city name!"))



    setInterval(function() {
        
        $('#currentDay').text(dayjs().format('MM/D/YYYY'));               
    }, 1000);


})

