import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import WeatherService from './services/weather-service.js';
import GiphyService from './services/giphy-service.js';

function clearFields() {
  $('#location').val("");
  $('.showErrors').text("");
  $('.showHumidity').text("");
  $('.showTemp').text("");
}

const displayGif = (response) => {
  const url = response.data[0].images.downsized.url;
  $('.showGif').html(`<img src='${url}'>`);
};

const displayWeatherDescription = (description) => {
  $('.showDescription').text(`Weather Description: ${description}`);
};

const displayErrors = (error) => {
  $('.show-errors').text(`${error}`);
};


$('#weatherLocation').click(function() {
  let zipcode = $('#location').val();
  let language = $('#language-picker').val();
  clearFields();
  WeatherService.getWeather(zipcode, language)
    .then(function(weatherResponse) {
      if (weatherResponse instanceof Error) {
        throw Error(`OpenWeather API Error: ${weatherResponse.message}`);
    }
    const weatherDescription = weatherResponse.weather[0].description;
    displayWeatherDescription(weatherDescription);
    $('.showHumidity').text(`The humidity in ${weatherResponse.name} is ${weatherResponse.main.humidity}%`);
    $('.showTemp').text(`The temperature in Fahrenheit is ${weatherResponse.main.temp} degrees.`);
    $('.showWind').text(`Current wind speed is ${weatherResponse.wind.speed} m/s & direction ${weatherResponse.wind.deg} degrees.`);
    return GiphyService.getGif(weatherDescription);
    })
    .then(function(giphyResponse) {
      if (giphyResponse instanceof Error) {
        throw Error(`Giphy API Error: ${giphyResponse.message}`);
      }
      displayGif(giphyResponse);
    })
    .catch(function(error) {
      displayErrors(error.message);
    });
});   


