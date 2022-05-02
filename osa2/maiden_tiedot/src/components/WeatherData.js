const WeatherData = ({ weatherData }) => {
  if (weatherData === undefined) {
    return <p>Loading data</p>;
  } else {
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
  }
};

export default WeatherData;
