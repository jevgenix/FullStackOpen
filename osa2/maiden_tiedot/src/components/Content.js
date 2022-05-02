import Countries from "./Countries";
import Country from "./Country";
const Content = ({ countries, searchData, handleShowButton }) => {
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

export default Content;
