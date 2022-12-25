const response = document.querySelector('#response');
const weatherForm = document.querySelector('#weather-form');
const weatherInput = document.querySelector('#city-name');

const fetchLocationWeather = (e) => {
    e.preventDefault();
    if (weatherInput.value !== '') {
        const weatherFetchedData = fetchWeather(weatherInput.value);
    } else {
        response.textContent = 'Wrong information or no information.';
    }
};

weatherForm.addEventListener('submit', fetchLocationWeather);

const API_KEY = 'ee1d8e5931d2ed22eaeb20ec46591503';
const CURRENT_DATE = new Date();
const fetchWeather = async (city) => {
    const result = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${API_KEY}`
    );
    const weatherData = await result.json();
    const cityName = weatherData.name;
    const cityTemp = weatherData.main.temp;
    const cityFeelsLike = weatherData.main.feels_like;
    const cityWindSpeed = weatherData.wind.speed;
    const cityHumidity = weatherData.main.humidity;
    const cityPressure = weatherData.main.pressure;
    response.textContent = `In ${cityName} the temp is ${
        (cityTemp - 273, 15)
    }℃, temp feels like ${(cityFeelsLike - 273, 15)}℃, the wind speed is ${
        Math.round(cityWindSpeed * 18) / 5
    }km/h, the humidity is ${cityHumidity}% and the pressure is ${cityPressure}hPa`;
};
