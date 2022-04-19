export default class WeatherService {  
  static getWeather(zipcode, language) {
    return fetch(`http://api.openweathermap.org/data/2.5/weather?zip=${zipcode}&appid=${process.env.API_KEY}&units=imperial&lang=${language}`)
      .then(function(response) {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();      
    })
    .catch(function(error) {
      return error;
    });
  }
}