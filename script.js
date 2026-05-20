let btnSearch = document.querySelector('.btn-search');

const getWeather = async () => {

  let search = document.querySelector('.search').value;

  let error = document.querySelector('.error');
  let error1 = document.querySelector('.error1');
  let error2 = document.querySelector('.error2');

  error.innerText = "";
  error1.innerText = "";
  error2.innerText = "";

  if (search === "") {
    error2.innerText = "Please Enter CityName";
    error.innerHTML = `<img src="img/mainImg.png" alt="weatherImg" width="8rem"></img>`;
    return;
  }

  let urlCity = `https://geocoding-api.open-meteo.com/v1/search?name=${search}&count=1`;

  let cityName = await fetch(urlCity);
  let cityData = await cityName.json();

  if (!cityData.results) {
    error.innerText = "❌ Oops...";
    error1.innerText = "404";
    error2.innerText = "City is not correct";
    return;
  }

  let lat = cityData.results[0].latitude;
  let lon = cityData.results[0].longitude

  let urlWeather = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code`;

  let cityTemp = await fetch(urlWeather);
  let cityWeather = await cityTemp.json();
  let temp = Math.floor(cityWeather.current.temperature_2m);
  let unit = cityWeather.current_units.temperature_2m;
  let code = Math.floor(cityWeather.current.weather_code);
  error2.innerText = search;
  error1.innerText = `${temp}${unit}`;

  if (code === 0) {
    error.innerHTML = `<img src="img/sunny.png" alt="weatherImg" width="8rem"></img>`;
  } else if (code >= 1 && code <= 3) {
    error.innerHTML = `<img src="img/cloudy.png" alt="cloudy" width="8rem">`;
  } else if (code >= 45 && code <= 48) {
    error.innerHTML = `<img src="img/mainImg.png" alt="weatherImg" width="8rem"></img>`;
  } else if (code >= 51 && code <= 67) {
    error.innerHTML = `<img src="img/Rain.png" alt="weatherImg" width="8rem"></img>`;
  } else {
    error.innerHTML = `<img src="img/sunny.png" alt="weatherImg" width="8rem"></img>`;
  }
};

btnSearch.addEventListener('click', () => {
  getWeather();
})
