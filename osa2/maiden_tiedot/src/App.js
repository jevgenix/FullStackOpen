import React, { useState, useEffect } from "react";
import axios from "axios";
import Content from "./components/Content";

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

      <Content
        countries={countries}
        searchData={searchData}
        handleShowButton={handleShowButton}
      />
    </div>
  );
}

export default App;
