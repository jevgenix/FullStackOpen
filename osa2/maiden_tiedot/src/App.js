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

const Country = ({ country }) => {
  const languages = country.languages;
  console.log(country);
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

  const handleShowButton = (event) => {
    event.preventDefault();

    Object.values(countries).map((country) => {
      if (country.name.common === event.target.value) {
        console.log(country.name.common);
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
