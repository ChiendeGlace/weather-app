const weatherForm = document.querySelector('#weather-form');
const weatherInput = document.querySelector('#city-input');
const weatherTypeInfo = document.querySelector('#weather');
const weatherTypeIcon = document.querySelector('#weather-icon');
const cityName = document.querySelector('#city-name');
const cityTemp = document.querySelector('#city-temp');
const currentDate = document.querySelector('#date');
const feelsLike = document.querySelector('#feels');
const humidity = document.querySelector('#humidity');
const windSpeed = document.querySelector('#windspeed');
const pressure = document.querySelector('#pressure');
const converter = document.querySelector('#converter');
const container = document.querySelector('.container');

const API_KEY = 'ee1d8e5931d2ed22eaeb20ec46591503';
const CURRENT_DATE = new Date();
const CURRENT_HOUR =
    CURRENT_DATE.toString().split(' ')[4].split(':')[0] +
    ':' +
    CURRENT_DATE.toString().split(' ')[4].split(':')[1];

const fetchLocationWeather = (e) => {
    e.preventDefault();
    if (weatherInput.value !== '') {
        fetchWeather(weatherInput.value);
    } else {
        alert('Wrong information or no information.');
    }
};

const displayData = (
    weatherType,
    cityDataName,
    cityDataTemp,
    cityFeels,
    cityHumidity,
    cityWindSpeed,
    cityPressure
) => {
    weatherTypeInfo.textContent = weatherType;
    weatherTypeIcon.className = '';
    if (weatherType == 'Clouds') {
        weatherTypeIcon.className = 'fa-solid fa-cloud';
        container.style.backgroundImage =
            'url(https://images.pexels.com/photos/53594/blue-clouds-day-fluffy-53594.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)';
    } else if (weatherType == 'Rain') {
        weatherTypeIcon.className = 'fa-solid fa-cloud-rain';
        container.style.backgroundImage =
            'url(https://images.pexels.com/photos/1028600/pexels-photo-1028600.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)';
    } else if (weatherType == 'Clear') {
        weatherTypeIcon.className = 'fa-solid fa-cloud-sun';
        container.style.backgroundImage =
            'url(https://images.pexels.com/photos/1133505/pexels-photo-1133505.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)';
    } else if (weatherType == 'Fog') {
        weatherTypeIcon.className = 'fa-solid fa-cloud-moon';
        container.style.backgroundImage =
            'url(https://images.pexels.com/photos/45222/forest-fog-nature-winter-45222.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)';
    } else if (weatherType == 'Haze') {
        weatherTypeIcon.className = 'fa-solid fa-smog';
        container.style.backgroundImage =
            'url(https://images.pexels.com/photos/1065925/pexels-photo-1065925.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)';
    } else if (weatherType == 'Mist') {
        weatherTypeIcon.className = 'fa-solid fa-cloud-moon';
        container.style.backgroundImage =
            'url(https://images.pexels.com/photos/45222/forest-fog-nature-winter-45222.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)';
    } else if (weatherType == 'Smoke') {
        weatherTypeIcon.className = 'fa-solid fa-cloud-moon';
        container.style.backgroundImage =
            'url(https://images.pexels.com/photos/45222/forest-fog-nature-winter-45222.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)';
    } else if (weatherType == 'Snow') {
        weatherTypeIcon.className = 'fa-solid fa-snowflake';
        container.style.backgroundImage =
            'url(https://images.pexels.com/photos/1571442/pexels-photo-1571442.jpeg?auto=compress&cs=tinysrgb&w=1600)';
    }
    cityName.textContent = cityDataName;
    cityTemp.textContent = Math.round(cityDataTemp - 273.15) + ' °C';
    currentDate.textContent = `${CURRENT_DATE.toDateString()} ${CURRENT_HOUR}`;
    feelsLike.textContent =
        'Feels like: ' + Math.round(cityFeels - 273.15) + ' °C';
    humidity.textContent = 'Humidity: ' + cityHumidity + ' %';
    windSpeed.textContent =
        'Wind speed: ' + Math.round((cityWindSpeed * 18) / 5) + ' km/h';
    pressure.textContent = 'Pressure: ' + cityPressure + ' hPa';
};

const fetchWeather = async (city) => {
    const result = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${API_KEY}`
    );
    const weatherData = await result.json();
    displayData(
        weatherData.weather[0].main,
        weatherData.name,
        weatherData.main.temp,
        weatherData.main.feels_like,
        weatherData.main.humidity,
        weatherData.wind.speed,
        weatherData.main.pressure
    );
};

weatherForm.addEventListener('submit', fetchLocationWeather);
window.addEventListener('load', fetchWeather('Warsaw'));
