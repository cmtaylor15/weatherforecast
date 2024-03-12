function updateWeather(response) {
  let temperatureElement = document.querySelector("#current-temp");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#city");
  let conditionElement = document.querySelector("#condition");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind-speed");
  let wind = response.data.wind.speed;
  let timeElement = document.querySelector("#date-time");
  let date = new Date(response.data.time * 1000);
  let iconElement = document.querySelector("#icon");

  cityElement.innerHTML = response.data.city;
  temperatureElement.innerHTML = Math.round(temperature);
  conditionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windElement.innerHTML = `${Math.round(wind)} km/h`;
  timeElement.innerHTML = formatDate(date);
  iconElement.innerHTML = `<img
                src="${response.data.condition.icon_url}"
                class="weather-icon"
              />`;
  getForecast(response.data.city);
}

function formatDate(date) {
  let hour = date.getHours();
  let minutes = date.getMinutes();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hour < 10) {
    hour = `0${hour}`;
  }
  return `${day} ${hour}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "73c8oabb640f490516db1tc6ac71625f";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(updateWeather);
}

function searchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");

  searchCity(searchInput.value);
}

function getForecast(city) {
  let apiKey = "73c8oabb640f490516db1tc6ac71625f";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");

  let days = ["Wed", "Thurs", "Fri", "Sat", "Sun"];
  let forecastHtml = "";

  days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `<div class="forecast-day">
              <div class="weather-forecast-day">${day}</div>
              <div class="weekly-forecast-icon">
                <img
                  src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/clear-sky-day.png"
                  alt=""
                  width="36"
                />
              </div>
              <div class="weekly-forecast-temperature">
                <span class="temperature-maximum">18° </span>
                <span class="temperature-minimum">12°</span>
              </div>
            </div>
          `;
  });
  forecastElement.innerHTML = forecastHtml;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", searchSubmit);

searchCity("London");
displayForecast();
