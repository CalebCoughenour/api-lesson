import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';

$(document).ready(function() {
  $('#weatherLocation').click(function() {
    const zipcode = $('#location').val();
    const language = $('#language-picker').val();
    $('#location').val("");

    let request = new XMLHttpRequest();
    const url = `http://api.openweathermap.org/data/2.5/weather?zip=${zipcode}&appid=${process.env.API_KEY}&units=imperial&lang=${language}`;

    request.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        const response = JSON.parse(this.responseText);
        getElements(response);
        console.log(response);
      }
    };

    request.open("GET", url, true);
    request.send();

    function getElements(response) {
      $('.showHumidity').text(`The humidity in ${zipcode} is ${response.main.humidity}%`);
      $('.showTemp').text(`The temperature in Farenheit is ${response.main.temp} degrees.`);
      $('.showWind').text(`Current wind speed is ${response.wind.speed} m/s & direction ${response.wind.deg} degrees.`);
      $('.showDescription').text(response.weather[0].description);

    }
  });
});