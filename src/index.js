import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import WeatherService from './js/weather-service.js'

function clearFields() {
  $('#location').val("");
  $('.showErrors').text("");
  $('.showHumidity').text("");
  $('.showTemp').text("");
}

$('#weatherLocation').click(function() {
  let city = $('#location').val();
  let language = $('#language-picker').val();
  clearFields();
  let promise = WeatherService.getWeather(city, language);
  promise.then(function(response) {
    const body = JSON.parse(response);
    $('.showHumidity').text(`The humidity in ${city} is ${body.main.humidity}%`);
    $('.showTemp').text(`The temperature in Fahrenheit is ${body.main.temp} degrees.`);
    $('.showWind').text(`Current wind speed is ${body.wind.speed} m/s & direction ${body.wind.deg} degrees.`);
    $('.showDescription').text(body.weather[0].description);
  }, function(error) {
    $('.showErrors').text(`There was an error processing your request: ${error}`);
  });
});   


