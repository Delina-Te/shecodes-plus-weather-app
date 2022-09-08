let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[now.getDay()];
let dayli = document.querySelector("li.date");
dayli.innerHTML = `${day}`;
let times = now.getHours();
if (times < 10) {
  times = `0${times}`;
}
let min = now.getMinutes();
if (min < 10) {
  min = `0${min}`;
}
let time = document.querySelector("li.time");
time.innerHTML = `${times}:${min}`;

function showTemperature(response) {
  let temperature = response.data.main.temp;
  document.querySelector("h1").innerHTML = response.data.name;
  document.querySelector("#h").innerHTML = Math.round(
    response.data.main.temp_max
  );
  document.querySelector("#L").innerHTML = Math.round(
    response.data.main.temp_min
  );
  let all = document.querySelector("#cTemp");
  all.innerHTML = Math.round(temperature);
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
}

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search");
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&units=metric`;
  let apiKey = "3499ef150985eccadd080ff408a018df";
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}
function searchLocation(position) {
  let apiKey = "3499ef150985eccadd080ff408a018df";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}
function currentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let forms = document.querySelector("#form");
forms.addEventListener("submit", search);
function temps(event) {
  event.preventDefault();
  let temp = document.querySelector("#cTemp");
  let tempC = Math.round(temp);
  let tempF = Math.round((tempC * 9) / 5 + 32);
  temp.innerHTML = `${tempF}`;
}
let tempForm = document.querySelector("#fTemp");
tempForm.addEventListener("click", temps);

let button = document.querySelector("#current");
button.addEventListener("click", currentLocation);

