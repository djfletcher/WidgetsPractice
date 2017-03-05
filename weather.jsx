import React from "react";
import ReactDOM from "react-dom";

class Weather extends React.Component {
  constructor(){
    super();
    this.state = { coords: undefined, weatherAll: undefined };
    this.lat = this.latitude();
    this.lon = this.longitude();
    this.apiKey = 'ad95d5b514fd365579f1848c09bae9df';
  }

  componentDidMount() {
    const self = this;
    navigator.geolocation.getCurrentPosition(pos => {
      self.setState({ coords: pos.coords });
      self.retrieveWeather();
    });
  }

  retrieveWeather() {
    const self = this;
    const xmlRequest = new XMLHttpRequest();
    const url = (
      `http://api.openweathermap.org/data/2.5/weather?lat=${this.latitude()}&lon=${this.longitude()}&APPID=${this.apiKey}`
    );
    xmlRequest.open("GET", url);
    xmlRequest.send();
    xmlRequest.onload = function() {
      const response = JSON.parse(this.response);

      const yourCity = response.name;
      const weatherData = response.weather[0];
      const windData = response.wind;
      const tempPressure = response.main;
      const clouds = response.clouds;

      console.log(`Weather for ${yourCity}:`);
      console.log(`-Summary: ${weatherData.main}, ${clouds.all}% cloudy`);
      console.log(`-Wind speed: ${windData.speed} meter/sec`);
      console.log(
        `-Temperature: ${tempPressure.temp} degrees Kelvin, Pressure: ${tempPressure.pressure} hPa`
      );

      const weatherAll = (
        <div className="weather-content">
          <h2>Weather for {yourCity}:</h2>
          <ul className="weather-data">
            <li>Summary: {weatherData.main}, {clouds.all}% cloudy</li>
            <li>Wind Speed: {windData.speed} meter/sec</li>
            <li>Temperature: {tempPressure.temp} degrees Kelvin</li>
            <li>Pressure: {tempPressure.pressure} hPa</li>
          </ul>
        </div>
      );

      self.setState({ weatherAll: weatherAll });
    };
  }

  latitude() {
    return this.state.coords ? this.state.coords.latitude : "(retrieving data...)";
  }

  longitude() {
    return this.state.coords ? this.state.coords.longitude : "(retrieving data...)";
  }

  render() {
    const weather = (
      <div className='weather-app'>{this.state.weatherAll}</div>
  );
    return(weather);
  }

}

export default Weather;
