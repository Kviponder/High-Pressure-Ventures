var APIKey = "e021bdc26c7a8da2768220633ec78553";
const searchForm = document.querySelector('.search-form');
const rsList = document.querySelector('.rsList');
const clearBtn = document.querySelector(".clearBtn")

document
  .querySelector(".search-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    var city = document.querySelector(".search-form input[type='text']").value;
    // nest multiple fetches so that second/third etc calls get called AFTER first call
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}&units=imperial`
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        updateCurrentWeather(data);
        addRecentSearch(city);
        //find 5-day endpoint
        fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${data.coord.lat}&lon=${data.coord.lon}&appid=${APIKey}&units=imperial`
        )
          .then(function (response) {
            return response.json();
          })
          .then(function (data) {
            updateFiveDayForecast(data);
          });
      });
  });

function updateCurrentWeather(data) {
  document.querySelector(".current-weather h2").textContent = data.name;
  document.querySelector(
    ".current-weather ul li:nth-child(1)"
  ).textContent = `Temperature: ${data.main.temp}°F`;
  document.querySelector(
    ".current-weather ul li:nth-child(2)"
  ).textContent = `Wind: ${data.wind.speed} m/s`;
  document.querySelector(
    ".current-weather ul li:nth-child(3)"
  ).textContent = `Humidity: ${data.main.humidity}%`;
}

function updateFiveDayForecast(data) {
  console.log(data);
  const cards = [
    document.querySelector("#forecastCard1"),
    document.querySelector("#forecastCard2"),
    document.querySelector("#forecastCard3"),
    document.querySelector("#forecastCard4"),
    document.querySelector("#forecastCard5"),
  ];
  const showForecast = document.querySelectorAll(".forecast");
  showForecast[0].classList.remove("showNone");

  //Adjust forecastCards to be called by jquery and call cards individually w/ ids
  for (let i = 0; i < cards.length; i++) {
    const forecast = data.list[i * 8];
    const date = new Date(forecast.dt * 1000).toLocaleDateString();
    const icon = `https://openweathermap.org/img/w/${forecast.weather[0].icon}.png`;
    const temp = forecast.main.temp.toFixed(0) + "°F";
    const windSpeed = forecast.wind.speed.toFixed(1);
    const windDirection = forecast.wind.deg;
    const humidity = forecast.main.humidity;

    const card = cards[i];
    const lis = card.querySelectorAll("ul li");
    console.log(lis);
    lis[0].textContent = date;

    const img = lis[1].querySelector("img");
    if (img) {
      img.src = icon;
    }

    lis[2].textContent = `Temp: ${temp}`;
    lis[3].textContent = `Wind: ${windSpeed} m/s`;
    lis[4].textContent = `Humidity: ${humidity}%`;
  }
}
console.log(updateFiveDayForecast);

function addRecentSearch(city) {
  const li = document.createElement('li');
  li.textContent= city;
  li.addEventListener('click', function() {
    document.querySelector('.search-form input[type="text"]').value = city;
    searchForm.dispatchEvent(new Event('submit'));
  });
  rsList.prepend(li);
}
clearBtn.addEventListener('click', function() {
  while (rsList.firstChild) {
rsList.removeChild(rsList.firstChild);
  }
});

