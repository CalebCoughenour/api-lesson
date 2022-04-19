import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import WeatherService from './js/weather-service.js';

function clearFields() {
  $('#location').val("");
  $('.showErrors').text("");
  $('.showHumidity').text("");
  $('.showTemp').text("");
}

function getElements(response) {
  if (response.main) {
    $('.showHumidity').text(`The humidity in ${response.name} is ${response.main.humidity}%`);
    $('.showTemp').text(`The temperature in Fahrenheit is ${response.main.temp} degrees.`);
    $('.showWind').text(`Current wind speed is ${response.wind.speed} m/s & direction ${response.wind.deg} degrees.`);
    $('.showDescription').text(response.weather[0].description);
  } else {
    $('.showErrors').text(`There was an error: ${response.message}`);
  }
}

$('#weatherLocation').click(function() {
  let zipcode = $('#location').val();
  let language = $('#language-picker').val();
  clearFields();
  WeatherService.getWeather(zipcode, language)
  .then(function(response) {
    console.log(response);
    getElements(response);
  });
});   


