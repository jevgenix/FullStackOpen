import React, { useState, useEffect } from "react";
import axios from "axios";

const Countries = ({ country }) => {
  return <li>{country.name.common}</li>;
};

const Country = ({ country }) => {
  const languages = country.languages;
  return (
    <div>
      <h1>{country.name.common}</h1>

      <p>capital {country.capital[0]} </p>
      <p> area {country.area} </p>
      <h3>languages: </h3>
      <ul>
        {Object.entries(languages).map((language) => {
          return <li key={language[0]}> {language[1]} </li>;
        })}
      </ul>
      <img alt="flag" src={country.flags["png"]} />
    </div>
  );
};

const FilterCountries = ({ countries, searchData }) => {
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
      return <Countries key={i} country={country} />;
    });

  if (filter.length === 1) {
    console.log(filter);
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

  return (
    <div>
      <form>
        <div>
          find countries{" "}
          <input value={searchData} onChange={handleFormSearch} />
        </div>
      </form>
      <FilterCountries countries={countries} searchData={searchData} />
    </div>
  );
}

export default App;
