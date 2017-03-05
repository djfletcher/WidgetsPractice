import React from "react";
import ReactDOM from "react-dom";

class Weather extends React.Component {
  constructor(){
    super();
    this.state = { coords: undefined };
    this.lat = this.latitude();
    this.lon = this.longitude();
  }

  componentDidMount() {
    let self = this;
    navigator.geolocation.getCurrentPosition(pos => {
      self.setState({ coords: pos.coords });
      // this is where I make the HTTP request
    });
  }

  latitude() {
    return this.state.coords ? this.state.coords.latitude : "(retrieving data...)";
  }

  longitude() {
    return this.state.coords ? this.state.coords.longitude : "(retrieving data...)";
  }

  render(){
    const weather = (
      <h1 className='weather-app'>
        This is weather. My position is {this.latitude()} by {this.longitude()}.
      </h1>
  );
    return(weather);
  }

}

export default Weather;
