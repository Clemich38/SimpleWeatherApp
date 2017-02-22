import { Component } from '@angular/core';
import { WeatherProvider } from './providers/weather-provider';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent
{
  title = 'Simple Weather App';

  public currentWeather: string;
  public currentWeatherDescription: string;
  public currentWeatherIcon: string;
  public currentTemp: number;
  public minTemp: number;
  public maxTemp: number;
  public currentHumidityLevel: number;
  public currentPressure: number;
  public currentClouds: number;
  public currentWindSpeed: number;
  public currentDate: Date;
  public currentCity: string;
  public city: string;
  public zip: string;
  public countryCode: string;

  constructor(public weather: WeatherProvider)
  {

    // Get the city name passed as a parameter
    this.currentCity = "";
    this.city = "";
    this.zip = "";
    this.countryCode = "";

    // Display current weather
    this.GetCurrentWeatherByName();
  }

  private GetCurrentWeatherByZip()
  {
    this.GetCurrentWeather(this.zip + "," + this.countryCode);
  }

  private GetCurrentWeatherByName()
  {
    this.GetCurrentWeather(this.city);
  }


  private GetCurrentWeather(arg: string)
  {
    // Get current weather
    this.weather.getWeather('weather?q=', arg).subscribe(
      data => {
        this.currentCity = data.name;
        this.currentWeather = data.weather[0].main;
        this.currentWeatherDescription = data.weather[0].description;
        this.currentWeatherIcon = data.weather[0].icon;
        this.currentTemp = Math.round(data.main.temp);
        this.currentWindSpeed = Math.round(data.wind.speed);
        this.minTemp = Math.round(data.main.temp_min);
        this.maxTemp = Math.round(data.main.temp_max);
        this.currentHumidityLevel = Math.round(data.main.humidity);
        this.currentPressure = Math.round(data.main.pressure);
        this.currentDate = new Date(data.dt * 1000);
      });
  }
}
