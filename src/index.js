/*
let weather = {
  paris: {
    temp: 19.7,
    humidity: 80
  },
  tokyo: {
    temp: 17.3,
    humidity: 50
  },
  lisbon: {
    temp: 30.2,
    humidity: 20
  },
  "san francisco": {
    temp: 20.9,
    humidity: 100
  },
  oslo: {
    temp: -5,
    humidity: 20
  }
};

let question = prompt("What is your city?");

switch (question) {
  case "paris":
    alert(
      "It is currently " +
        Math.round(weather.paris.temp) +
        "°C (" +
        (Math.round(weather.paris.temp) * 1.8 + 32) +
        " F)" +
        " in Paris with a humidity of " +
        weather.paris.humidity +
        "%."
    );
    break;
  case "tokyo":
    alert(
      "It is currently " +
        Math.round(weather.tokyo.temp) +
        "°C (" +
        Math.round(weather.tokyo.temp * 1.8 + 32) +
        " F)" +
        " in Tokyo with a humidity of " +
        weather.tokyo.humidity +
        "%."
    );
    break;
  case "lisbon":
    alert(
      "It is currently " +
        Math.round(weather.lisbon.temp) +
        "°C (" +
        (Math.round(weather.lisbon.temp) * 1.8 + 32) +
        "F)" +
        " in Lisbon with a humidity of " +
        weather.lisbon.humidity +
        "%."
    );
    break;
  case "san francisco":
    alert(
      "It is currently " +
        Math.round(weather["san francisco"].temp) +
        "°C (" +
        Math.round(weather["san francisco"].temp * 1.8 + 32) +
        " F)" +
        " in San Francisco with a humidity of " +
        weather["san francisco"].humidity +
        "%."
    );
    break;
  case "moscow":
    alert(
      "It is currently " +
        Math.round(weather.moscow.temp) +
        "°C (" +
        Math.round(weather.moscow.temp * 1.8 + 32) +
        " F)" +
        " in moscow with a humidity of " +
        weather.moscow.humidity +
        "%."
    );
    break;
  default:
    alert(
      `Sorry, we don't know the weather for this city, try going to https://www.google.com/search?q=weather+` +
        question
    );
}
*/

let currentDate = document.querySelector(
  ".cardbody_name_current, #current-date"
);

let Today = new Date();

let days = [
  "Неділя",
  "Понеділок",
  "Вівторок",
  "Середа",
  "Четвер",
  "П'ятниця",
  "Субота"
];
let currentDay = days[Today.getDay()];
let hour = Today.toLocaleTimeString();
let currentToday = `${currentDay}  ${hour}`;
currentDate.innerHTML = currentToday;

function clickFarenheit() {
  let temperatureClickFarenheit = document.querySelector(
    "#cardbody_temperature_current"
  );
  let F = 25 * 1.8 + 32;
  temperatureClickFarenheit.innerHTML = F;
}

let temperatureFarenheit = document.querySelector(
  ".cardbody_temperature, #farenheit"
);
temperatureFarenheit.addEventListener("click", clickFarenheit);
/* 
1.создать функцию определения геолокации
2. Выводить в div class="cardbody_name_city" id="current-city" название введенного города
Выводить в div class="cardbody_temperature" span class="cardbody_temperature" id="cardbody_temperature_current"
текущую температуру в городе
Для этого используем апи по названию
3. Если пользователь ввел некорректный город - выводить окно "Введите корректно название города"

 */
//создаем функцию получения геолокации

//создаем функцию получения позиции из апи по координатам
function searchLocation(position) {
  let apiKey = "28d4041f2cf9da666f821ae6153c05d7";
  let units = "metric";
  let apiResponse = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiResponse).then(showTemp);
}

//получаем температуру по геолокации
function showTemp(response) {
  let userTemp = Math.round(response.data.main.temp);
  document.querySelector(".cardbody_name_city").innerHTML = response.data.name;
  document.querySelector(
    "#cardbody_temperature_current"
  ).innerHTML = `${userTemp}`;
  let humidity = response.data.main.humidity;
  document.querySelector("#humidity").innerHTML = `${humidity} %`;
  let wind = Math.round(response.data.wind.speed);
  document.querySelector("#wind").innerHTML = `${wind} м/сек`;
}

function searchCity(city) {
  let apiKey = "28d4041f2cf9da666f821ae6153c05d7";
  let units = "metric";
  let apiCity = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiCity).then(showTemp);
}

function inputCity(event) {
  event.preventDefault();
  let city = document.querySelector("#search-city").value;
  searchCity(city);
}

function getLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let form = document.querySelector("#search-city-form");
form.addEventListener("submit", inputCity);

let clickButton = document.querySelector("#current-location-button");
clickButton.addEventListener("click", getLocation);

searchCity("Dnipro");
