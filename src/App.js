import React from "react";

import './App.css';


import Weather from './app_component/checkweather.component';
import Form from './app_component/form.component';
import 'bootstrap/dist/css/bootstrap.min.css';
import "weather-icons/css/weather-icons.css";
// api call api.openweathermap.org/data/2.5/weather?q=Toronto,ca
const API_key="4baee0eb17f850bc207f270d4e6468b5"

class App extends React.Component {
  constructor(){
    super();
    this.state = {
      city: undefined,
      country: undefined,
      icon: undefined,
      main: undefined,
      celsius: undefined,
      temp_max: null,
      temp_min: null,
      description: "",
      error: false
    };
    

    this.weatherIcon = {
      Thunderstorm: "wi-thunderstorm",
      Drizzle: "wi-sleet",
      Rain: "wi-storm-showers",
      Snow: "wi-snow",
      Atmosphere: "wi-fog",
      Clear: "wi-day-sunny",
      Clouds: "wi-day-fog"
    };
  }

  calCelsius(temp){
    let unit = Math.floor(temp - 273.15)
    return unit;
  }

  get_WeatherIcon(icons,range){
    switch(true){
      case range >= 300 && range <= 321:
        this.setState({icon:this.weatherIcon.Drizzle});
        break;
        case range >= 200 && range <= 232:
        this.setState({icon:this.weatherIcon.Thunderstorm});
        break;
        case range >= 500 && range <= 521:
        this.setState({icon:this.weatherIcon.Rain});
        break;
        case range >= 600 && range <= 622:
        this.setState({icon:this.weatherIcon.Snow});
        break;
        case range >= 701 && range <= 781:
        this.setState({icon:this.weatherIcon.Atmosphere});
        break;
        case range === 800:
        this.setState({icon:this.weatherIcon.Clear});
        break;
        case range >= 801 && range <= 804:
        this.setState({icon:this.weatherIcon.Clouds});
        break;
        default:
          this.setState({icon:this.weatherIcon.Clouds});
    }
  }

  getWeather = async(e) =>{

    e.preventDefault();

    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;

    if(city && country){
      const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_key}`);
  
  const response = await api_call.json();


  console.log(response);

  this.setState({
    city: `${response.name},${response.sys.country}`,
    celsius: this.calCelsius(response.main.temp),
    temp_min:this.calCelsius(response.main.temp_min),
    temp_max:this.calCelsius(response.main.temp_max),
    description: response.weather[0].description,
    error: false
     });

     this.get_WeatherIcon(this.weatherIcon,response.weather[0].id);
    } else{
      this.setState({error:true})
    }
};

  render() {
    return (
      <div className="App">
        <Form loadweather={this.getWeather} error={this.state.error}/>
        <Weather 
        city={this.state.city} 
        country={this.state.country}
        temp_celsius={this.state.celsius}
        temp_min={this.state.temp_min}
        temp_max={this.state.temp_max}
        description={this.state.description} 
        weatherIcon={this.state.icon}
        />
      </div>
    );
  }
}

export default App;
