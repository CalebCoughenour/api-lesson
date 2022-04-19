export default class WeatherService {  
  static async getWeather(zipcode, language) {
    try {
    const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?zip=${zipcode}&appid=${process.env.API_KEY}&units=imperial&lang=${language}`);
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();      
    }
    catch(error) {
      return error.message;
    }
  }
}