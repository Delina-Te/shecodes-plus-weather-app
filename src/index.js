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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "wed", "Thu", "Fri", "Sat"];



  return days[day];
}


function getForcast(coordinates) {
  console.log(coordinates);
  let apiKey = "3499ef150985eccadd080ff408a018df";
  apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayforcast); 
}


function showTemperature(response) {
  let temperature = response.data.main.temp;
  document.querySelector("h1").innerHTML = response.data.name;
  document.querySelector("#h").innerHTML = Math.round(
    response.data.main.temp_max
  );

  celsius = response.data.main.temp;
    
  document.querySelector("#L").innerHTML = Math.round(
    response.data.main.temp_min
  );
  let all = document.querySelector("#cTemp");
  all.innerHTML = Math.round(temperature);
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  
  getForcast(response.data.coord);
}
function displayforcast(response) {
  let forcasts= response.data.daily;
  let forcast = document.querySelector("#weather-forcast");
 
  let forcastHTML = `<div class="row">`;
  forcasts.forEach(function (forcastsDay, index) {
    if (index < 6) {
      forcastHTML =
        forcastHTML +
        `<div class="col-2">
<div class="weather-forcast-days"> ${formatDay(forcastsDay.dt)}</div>
<img src="http://openweathermap.org/img/wn/${forcastsDay.weather[0].icon}@2x.png" width="50" class="weather-forcast-img">
<div class="weather-forcast-temperature";
    <span class="max">${Math.round(forcastsDay.temp.max)}°</span><span class="min">${Math.round(forcastsDay.temp.min)}</span>
</div>
</div>
`;
    
    }
    
  });
  forcastHTML = forcastHTML + `</div>`;
  forcast.innerHTML = forcastHTML;
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


function convertF(event) {
  event.preventDefault();
  
  let farenheitElement = document.querySelector("#cTemp");
  let fahrenheitTemp = (celsius * 9) / 5 + 32;
  farenheitElement.innerHTML = Math.round(fahrenheitTemp); 

}
 function convertC(Event){
  Event.preventDefault();
 

  let fahrenheitElement = document.querySelector("#cTemp");
  fahrenheitElement.innerHTML = Math.round(celsius);
}
let celsius = null;
let forms = document.querySelector("#form");
forms.addEventListener("submit", search);

let button = document.querySelector("#current");
button.addEventListener("click", currentLocation);

let fahrenheit = document.querySelector("#fTemp");
fahrenheit.addEventListener("click", convertF);


let celsiusT = document.querySelector("#C");
celsiusT.addEventListener("click", convertC);




