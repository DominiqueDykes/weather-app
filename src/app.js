function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

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
  return `${day} ${hours}:${minutes}`;
}

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `       

    <div class="col-2">
      <div class="weather-forecast-date">
           ${day}
            </div>
              <img src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/snow-night.png" alt="" width="42"
                    />
                    <div class="weather-forecast-temperatures">
                   <span class="weather-forecast-temperature-max">
                        18° </span>
                       <span class="weather-forecast-temperature-min"> 12° </span> 
                </div>
            </div>
            `;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(api, coordinates) {
  let apiUrl, apiKey;

  if (api === "shecodes") {
    apiKey = "obb0cabb84e68cc4930b1bfb662005f";
    apiUrl = `https://api.shecodes.io/weather/v1/current?lat=${coordinates.lat}&lon=${coordinates.lon}&key=${apiKey}&units=metric`;
  } else if (api === "openweathermap") {
    apiKey = "5c7336ed46ef2ce4dd6f3d5cb116bcce";
  }
  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lon=${coordinates.lon}&lat=${coordinates.lat}&appid=5c7336ed46ef2ce4dd6f3d5cb116bcce&units=metric`;

  axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");

  celsiusTemperature = response.data.temperature.current;

  temperatureElement.innerHTML = Math.round(response.data.temperature.current);
  cityElement.innerHTML = response.data.city;
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = response.data.temperature.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.time * 1000);
  iconElement.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
  iconElement.setAttribute("alt", response.data.condition.description);

  const newCoords = { lat: 39.31, lon: -74.5 };
  getForecast("openweathermap", newCoords);
}

function search(city) {
  let apiKey = "obb0cabb84e68cc4930b1tbfb662005f";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=obb0cabb84e68cc4930b1tbfb662005f&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

let convertToFahrenheit = false;

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let celsiusTemperature = Number(
    document.querySelector("#temperature").innerText
  );
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");

  let fahrenheitTemperature = celsiusTemperature * 1.8 + 32;
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Temperature;
}

search("New York");

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);
