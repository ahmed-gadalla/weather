weather = [];
var dayName = [
  "Sunday",
  "Monday",
  "Tuesday",
  "wednesday",
  "Thursday",
  "Friday",
  "Saterday",
];

var searchBarInput = document.getElementById("searchBar");

function test (){
  console.log(searchBarInput.value)
}

async function getWeather(city) {
  var url = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=b8be609fae274646bc3153935233012&q=${city}&days=3`
    
  );

  var res = await url.json();

  weather = res;
  displayCurrent();
  displayForecast();
  console.log(weather);
}

getWeather("cairo");

 function search() {
  var searchLocation = searchBarInput.value;
  console.log(searchLocation)
   getWeather(searchLocation);
}

function displayCurrent() {
  document.getElementById("Current").innerHTML = `
  <div class="d-flex justify-content-between align-items-center flex-column">
            <div
              class="day d-flex align-items-center justify-content-evenly w-50 pb-3 flex-column"
            >
              <h4>${dayName[new Date(weather.location.localtime).getDay()]}</h4>
              <h6>${weather.location.localtime}</h6>
            </div>

            <div
              class=" d-flex justify-content-around align-items-center w-100"
            >
              <div class="country w-25 text-center">
                <h1>${weather.location.name}</h1>
                <p>${weather.current.condition.text}</p>
              </div>
              <div class="degree w-50 d-flex justify-content-evenly align-items-center">
                <h2>${weather.current.temp_c} <span>o</span> c</h2>
                <img src="${
                  weather.current.condition.icon
                }" alt="" class="w-25 " />
              </div>
              <div class="more-info inner-info shadow-lg  rounded-5 p-3">
                <div class="d-flex justify-content-between align-items-center py-2 ">
                  <img src="imgs/icon-umberella@2x.png" alt="" class="" />
                  <p>${weather.current.precip_in}</p>
                </div>

                <div class="d-flex justify-content-between align-items-center py-2">
                  <img src="imgs/icon-wind@2x.png" alt="" />
                  <p>${weather.current.wind_kph} KM/H</p>
                </div>

                <div class="d-flex justify-content-between align-items-center py-2">
                  <img src="imgs/icon-compass@2x.png" alt="" />
                  <p>${weather.current.wind_dir}</p>
                </div>
              </div>
            </div>
          </div>`;
}

function displayForecast() {
  box = ``;

  for (var i =1; i < weather.forecast.forecastday.length; i++) {
    box += `
    <div class="smallCard col-md-6  p-4 rounded-5 main-info ">

          <div
          class="d-flex justify-content-between align-items-center flex-column  "
         >
           <div
            class="day d-flex align-items-center justify-content-evenly w-50 pb-3 flex-column"
           >
            <h4>${
              dayName[new Date(weather.forecast.forecastday[i].date).getDay()]
            }</h4>
            <p>${weather.forecast.forecastday[i].day.condition.text}</p>
          
           </div>

           <div
            class=" d-flex justify-content-around align-items-center w-100"
           >
            
            <div class="degree w-75 d-flex justify-content-evenly align-items-center flex-column">
              <img src="${
                weather.forecast.forecastday[i].day.condition.icon
              }" alt="" class="w-25" />
              
              <div class="text-center">
                <h2> ${
                  weather.forecast.forecastday[i].day.maxtemp_c
                }<span>o</span> c</h2>
                <p class="fs-3">${
                  weather.forecast.forecastday[i].day.mintemp_c
                }</p>
              </div>

              
            </div>

           </div>
        
        
          </div>
        </div>`;
  }

  document.getElementById("forecast").innerHTML = box;
}
