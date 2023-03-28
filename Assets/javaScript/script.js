var APIKey = "e021bdc26c7a8da2768220633ec78553";
document.querySelector(".search-form").addEventListener("submit", function (event) {
    
    event.preventDefault();
    var city = document.querySelector(".search-form input[type='text']").value;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}&units=imperial`)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            updateCurrentWeather(data);
        });
});

function updateCurrentWeather(data) {
    document.querySelector(".current-weather h2").textContent = data.name;
    document.querySelector(".current-weather ul li:nth-child(1)").textContent = `Temperature: ${data.main.temp}°F`;
    document.querySelector(".current-weather ul li:nth-child(2)").textContent = `Wind: ${data.wind.speed} m/s`;
    document.querySelector(".current-weather ul li:nth-child(3)").textContent = `Humidity: ${data.main.humidity}%`;
}