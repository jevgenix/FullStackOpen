import React, { useState, useEffect } from "react";
import axios from "axios";

const Countries = ({ country, handleShowButton }) => {
  return (
    <li>
      {country.name.common}
      <button
        onClick={handleShowButton}
        value={country.name.common}
        type="submit"
      >
        show
      </button>
    </li>
  );
};

const WeatherData = ({ weatherData }) => {
  const { name, main, wind, weather } = weatherData;
  const icon = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;
  return (
    <div>
      <h1>Weather in {name}</h1>
      <p>temperature {(main.temp - 273.15).toFixed(2)} Celcius</p>
      <img alt="weather" src={icon} />
      <p> wind {wind.speed} m/s</p>
    </div>
  );
};

const Country = ({ country }) => {
  const { capital, name, languages, area, flags } = country;
  const [weatherData, setWeatherData] = useState({});
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
        console.log(response.data);
        setWeatherData(response.data);
      });
  }, [capital, api_key]);

  console.log(weatherData);
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

const FilterCountries = ({ countries, searchData, handleShowButton }) => {
  const filter = countries
    .filter((country) => {
      if (searchData === "") {
        return "";
      } else if (
        country.name.common.toLowerCase().includes(searchData.toLowerCase())
      ) {
        return country;
      }
    })
    .map((country, i) => {
      return (
        <Countries
          key={i}
          country={country}
          handleShowButton={handleShowButton}
        />
      );
    });

  if (filter.length === 1) {
    return <Country country={filter[0].props.country} />;
  } else {
    return <ul>{filter}</ul>;
  }
};

function App() {
  const [countries, setCountries] = useState([]);
  const [searchData, setSearchData] = useState("");

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      setCountries(response.data);
    });
  }, []);

  const handleFormSearch = (event) => {
    setSearchData(event.target.value);
  };

  const handleShowButton = (event) => {
    event.preventDefault();

    Object.values(countries).map((country) => {
      if (country.name.common === event.target.value) {
        setSearchData(country.name.common);
      }
    });
  };

  return (
    <div>
      <form>
        <div>
          find countries{" "}
          <input value={searchData} onChange={handleFormSearch} />
        </div>
      </form>

      <FilterCountries
        countries={countries}
        searchData={searchData}
        handleShowButton={handleShowButton}
      />
    </div>
  );
}

export default App;
