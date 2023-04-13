// create all global variables
var button = document.querySelector('.btn');
var inputValue = document.querySelector('.inputValue');
var city
var cityName = document.querySelector('.cityName');
// used jquery to the the Icon from the webpage
var icon = $('#icon');
var temperature = document.querySelector('.temp');
var windSpeed = document.querySelector('.windSpeed');
var humidity = document.querySelector('.humidity');
var historyTitle = document.querySelector('.history');
var searchCities = JSON.parse(localStorage.getItem('cities')) || []
// var cityButton = document.createElement('button')
var historyButtons = document.querySelector('.historyButtons')
// historyButtons.innerHTML = ""

console.log(typeof searchCities)

// create a function to fetch the latitude and longitude of a city
function searchCity() {
    searchCities.push(city);
    // city = inputValue.value 
    console.log(city)
    localStorage.setItem("cities", JSON.stringify(searchCities));
    // searchHistory();

    fetch('https://api.openweathermap.org/geo/1.0/direct?q=' + city + '&appid=232b6c46052204d8ef059e1facae5a19')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var latitude = data[0].lat;
            var longitude = data[0].lon;


            // create a fetch to get the data for the current weather
            fetch('https://api.openweathermap.org/data/2.5/weather?lat=' + latitude + '&lon=' + longitude + '&appid=232b6c46052204d8ef059e1facae5a19&units=imperial')
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    //create variables to save the data we need to display 
                    var nameValue = data['name'];
                    var tempValue = data['main']['temp'];
                    var iconValue = data['weather'][0]['icon'];
                    var iconUrl = 'https://openweathermap.org/img/wn/' + iconValue + '.png';
                    icon.attr('src', iconUrl);
                    icon.attr('alt', 'Weather Icon')
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
    // call forecast function
    forecast();

}

function forecast() {
    // use this variables to help locate the data we need
    var b = 2
    // create a fetch to get the data for the city latitude and longitude
    fetch('https://api.openweathermap.org/geo/1.0/direct?q=' + city + '&appid=232b6c46052204d8ef059e1facae5a19')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {

            console.log(data)
            var latitude = data[0].lat;
            var longitude = data[0].lon;
            // create a fetch to get the data for the forecast weather
            fetch('https://api.openweathermap.org/data/2.5/forecast?lat=' + latitude + '&lon=' + longitude + '&appid=232b6c46052204d8ef059e1facae5a19&units=imperial')
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    // create a for loop to create the 5 days forecast
                    for (var i = 1; i < 6; i++) {
                        // create variables 
                        var icon = $('#icon-' + i);
                        var temp = document.querySelector('.temp-' + i);
                        var wind = document.querySelector('.windSpeed-' + i);
                        var humidity = document.querySelector('.humidity-' + i);


                        var tempValue = data['list'][(3 * b) - i]['main']['temp'];
                        var iconValue = data['list'][(3 * b) - i]['weather'][0]['icon'];
                        var iconUrl = 'https://openweathermap.org/img/wn/' + iconValue + '.png';
                        icon.attr('src', iconUrl);
                        icon.attr('alt', 'Weather Icon')
                        var windSpeedValue = data['list'][(3 * b) - i]['wind']['speed'];
                        var humidityValue = data['list'][(3 * b) - i]['main']['humidity'];

                        var forecastTitle = document.querySelector('.forecast5Days')
                        forecastTitle.innerHTML = "5-Day Forecast"

                        $('.date-' + i).text(dayjs().add(i, 'day').format('MM/D/YYYY'));
                        temp.innerHTML = 'Temp: ' + tempValue + ' °F';
                        wind.innerHTML = 'Wind: ' + windSpeedValue + ' mph';
                        humidity.innerHTML = 'Humidity: ' + humidityValue;
                        b = b + 3;
                    }



                })
        })



}


// create a function to save the search history
// We are going to use this variable to assign different city names in local stores
// var i = 1
function searchHistory() {
    console.log(searchCities)
    historyButtons.innerHTML = "";
    for (let index = 0; index < 10 && index < searchCities.length; index++) {
        var cityButton = document.createElement('button')
        cityButton.textContent = searchCities[index]
        cityButton.classList.add("buttonHistory")
        historyButtons.appendChild(cityButton)

    }
    buttonHistory = document.querySelectorAll(".historyButtons button")

    buttonHistory.forEach(function (button) {
        button.addEventListener("click", function (event) {
            console.log(event.target)
            console.log(button.textContent)
            city = button.textContent
            // historyButtons.innerHTML = "";
            searchCity()
        })
    })
}

searchHistory();


button.addEventListener('click', function (event) {
    city = inputValue.value
    searchCity()
    searchHistory()
})
// buttonHistory.addEventListener('click', recallCity);
buttonHistory = document.querySelectorAll(".historyButtons button")

// buttonHistory.forEach(function (button) {
//     button.addEventListener("click", function (event) {
//         console.log(event.target)
//         console.log(button.textContent)
//         city = button.textContent
//         searchCity()
//     })
// })


