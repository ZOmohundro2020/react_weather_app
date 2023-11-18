export default function CityWeather({ cityList, fetchedWeather }) {
  console.log("cityList prop is:");
  console.log(cityList);

  const citiesList = cityList.map((city, index) => (
    <div key={index}>
      {/* <h3>Hardcoded: {city.current}°</h3> */}
      {/* <h3>Test: {fetchedWeather.current.temperature_2m}°</h3> */}

      {/* <p>Hardcoded: {`H:${city.high}° L:${city.low}°`}</p> */}
      <p>
        Test:{" "}
        {/* {`H:${fetchedWeather.daily.temperature_2m_max}° L:${fetchedWeather.daily.temperature_2m_min}°`} */}
      </p>

      <h4>{city.name}</h4>
    </div>
  ));

  return <>{citiesList}</>;
}
