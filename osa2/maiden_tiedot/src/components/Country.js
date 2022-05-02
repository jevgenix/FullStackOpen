import { useState, useEffect } from "react";
import axios from "axios";
import WeatherData from "./WeatherData";
const Country = ({ country }) => {
  const { capital, name, languages, area, flags } = country;
  const [weatherData, setWeatherData] = useState();
  const api_key = process.env.REACT_APP_WEATHER_API_KEY;

  useEffect(() => {
    axios
      .get(
        "https://api.openweathermap.org/data/2.5/weather?q=" +
          capital +
          "&APPID=" +
          api_key
      )
      .then((response) => {
        return setWeatherData(response.data);
      });
  }, [capital, api_key]);

  return (
    <div>
      <h1>{name.common}</h1>
      <p>capital {capital} </p>
      <p> area {area} </p>
      <h3>languages: </h3>
      <ul>
        {Object.entries(languages).map((language) => {
          return <li key={language[0]}> {language[1]} </li>;
        })}
      </ul>
      <img alt="flag" src={flags["png"]} />
      <WeatherData weatherData={weatherData} />
    </div>
  );
};

export default Country;
