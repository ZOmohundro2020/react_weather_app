import { useState, useEffect } from "react";

export default function CityWeather({ cityList }) {
  console.log("cityList prop is:", cityList);

  const [currentConditions, setCurrentConditions] = useState({});
  const [isFetching, setisFetching] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    // declare the data fetching function
    const fetchData = async () => {
      setisFetching(true);

      try {
        const response = await fetch(
          "https://api.open-meteo.com/v1/forecast?latitude=45.4112&longitude=-75.6981&current=temperature_2m&daily=temperature_2m_max,temperature_2m_min&temperature_unit=fahrenheit&timezone=America%2FNew_York&forecast_days=1"
        );
        const data = await response.json();

        if (!response.ok) {
          throw new Error("failed to load data");
        }

        setCurrentConditions({ ...data });
      } catch (error) {
        setError(error.message);
      }

      // console.log(data);
      // console.log(data.current.temperature_2m);
      // console.log(data.daily.temperature_2m_min);
      // console.log(data.daily.temperature_2m_max);

      setisFetching(false);
    };

    // call the function
    fetchData();
  }, []);

  if (error) {
    console.log(error);
  }

  console.log("current conditions is:", currentConditions);

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

  return <article>{isFetching ? <p>Loading</p> : citiesList}</article>;
}
