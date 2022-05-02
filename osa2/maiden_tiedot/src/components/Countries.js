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

export default Countries;
