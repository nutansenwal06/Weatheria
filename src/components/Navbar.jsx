import React, { useState } from "react";
import "./stylesheets/Navbar.css";
import humidity_icon from "./assets/humidity.png";
import search_icon from "./assets/search.png";
import wind_icon from "./assets/wind.png";
import AQI_icon from "./assets/AQI.png";
import welcome from "./assets/weatheria.png";

export default function Navbar() {
  console.log(this);
  const API_key = "9074e5f8e7f44de1a1f23724231412";
  const [icon, setIcon] = useState({ welcome });
  const search = async () => {
    const element = document.getElementsByClassName("cityName");
    if (element[0].value === "") {
      alert("Enter a city name to continue");
      return 0;
    } else {
      const url = `http://api.weatherapi.com/v1/current.json?key=${API_key}&q=${element[0].value}&aqi=yes`;
      const response = await fetch(url);
      const data = await response.json();
      if (data.hasOwnProperty("current")) {
        const location = document.getElementsByClassName("city");
        const tempreture = document.getElementsByClassName("tempreture");
        const humidity = document.getElementsByClassName("humidity");
        const windSpeed = document.getElementsByClassName("wind-speed");
        const feelsLike = document.getElementsByClassName("feels-like");
        const AQI = document.getElementsByClassName("AQI");
        setIcon({ welcome: data.current.condition.icon });
        location[0].innerHTML = data.location.name;
        tempreture[0].innerHTML = data.current.temp_c + " °C";
        humidity[0].innerHTML = data.current.humidity + " %";
        AQI[0].innerHTML = data.current.air_quality.pm2_5;
        feelsLike[0].innerHTML =
          " feels like " + data.current.feelslike_c + " °C";
        windSpeed[0].innerHTML =
          data.current.wind_kph + " km/h" + " to " + data.current.wind_dir;
      } else {
        alert("Enter a valid city");
        return 0;
      }
    }
  };
  return (
    <div className="jumbotron vertical-center">
      <div className="container align-item-center">
        <div className="top-bar">
          <input type="text" className="cityName" placeholder="Search" />
          <span
            className="search-icon"
            onClick={() => {
              search();
            }}
          >
            <img
              src={search_icon}
              alt="Go"
              onClick={() => {
                search();
              }}
            />
          </span>
        </div>
        <img src={icon.welcome} className="weather-image" />
        <div className="weather-info">
          <div className="city-data">
            <div className="city "></div>
            <div className="city tempreture"></div>
            <div className="city feels-like"></div>
          </div>

          <div className="air">
            <div className="air-data">
              <img src={humidity_icon} className="air-img" />
              <div className="data humidity"></div>
              <div className="data">Humidity</div>
            </div>
            <div className="air-data">
              <img src={wind_icon} className="air-img" />
              <div className="data wind-speed"></div>
              <div className="data">Wind Speed</div>
            </div>
            <div className="air-data">
              <img src={AQI_icon} className="air-img" />
              <div className="data AQI"></div>
              <div className="data">AQI</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
