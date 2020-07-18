import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "weather-icons/css/weather-icons.css";
import Weather from "./components/weatherapp";
import Form from "./components/form";

// api.openweathermap.org/data/2.5/weather?q=London,uk
const API_KEY = "db0722dc5ad7c43d8271bb13f965e3fb";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: undefined,
      country: undefined,
      icon: undefined,
      main: undefined,
      celsius: undefined,
      temp_max: undefined,
      temp_min: undefined,
      description: "",
      error: false,
    };
    this.weathericon = {
      Thunderstorm: "wi-thunderstorm",
      Drizzle: "wi-select",
      Rain: "wi-storm-showers",
      Snow: "wi-snow",
      Atmosphere: "wi-fog",
      Clear: "wi-day-sunny",
      clouds: "wi-day-fog",
    };
  }

  calCelsius(temp) {
    let cell = Math.floor(temp - 273.15);
    return cell;
  }

  get_WeatherIcon(icons, rangeId) {
    switch (true) {
      case rangeId >= 200 && rangeId <= 232:
        this.setState({ icon: this.weathericon.Thunderstorm });
        break;
      case rangeId >= 300 && rangeId <= 321:
        this.setState({ icon: this.weathericon.Drizzle });
        break;
      case rangeId >= 500 && rangeId <= 531:
        this.setState({ icon: this.weathericon.Rain });
        break;
      case rangeId >= 600 && rangeId <= 622:
        this.setState({ icon: this.weathericon.Snow });
        break;
      case rangeId >= 701 && rangeId <= 781:
        this.setState({ icon: this.weathericon.Atmosphere });
        break;
      case rangeId === 800:
        this.setState({ icon: this.weathericon.Clear });
        break;
      case rangeId >= 801 && rangeId <= 804:
        this.setState({ icon: this.weathericon.clouds });
        break;
      default:
        this.setState({ icon: this.weathericon.clouds });
    }
  }
  getWeatherData = async (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    if (city&&country){
      const api_call = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}`
      );
      const response = await api_call.json();
      this.setState({
        city: `${response.name},${response.sys.country}`,
        country: response.sys.country,
        celsius: this.calCelsius(response.main.temp),
        temp_max: this.calCelsius(response.main.temp_max),
        temp_min: this.calCelsius(response.main.temp_min),
        description: response.weather[0].description,
        error: false
      });
      this.get_WeatherIcon(this.weathericon, response.weather[0].id);
    }else{
      this.setState({error:true})
    }
  };
  
  render() {
    const {
      city,
      country,
      icon,
      main,
      celsius,
      temp_max,
      temp_min,
      description,
      error,
    } = this.state;
    return (
      <div className="App">
        <Form loadweather={this.getWeatherData} error={error} />
        <Weather
          city={city}
          country={country}
          main={main}
          celsius={celsius}
          temp_max={temp_max}
          temp_min={temp_min}
          description={description}
          weathericon={icon}
        />
      </div>
    );
  }
}

export default App;
