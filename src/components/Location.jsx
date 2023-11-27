import { useState, useEffect } from "react";

export default function Location({ city, lat, lon, unit }) {
  let tempUnitString = "";
  if (unit === "fahrenheit") {
    tempUnitString = "&temperature_unit=fahrenheit";
  }

  console.log(tempUnitString);

  const [currentConditions, setCurrentConditions] = useState({});
  const [isFetching, setisFetching] = useState(true);
  const [error, setError] = useState(null);

  console.log("lat,long", lat, lon);

  // temperature_unit=fahrenheit

  useEffect(() => {
    // declare the data fetching function
    const fetchData = async () => {
      setisFetching(true);

      try {
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m&daily=temperature_2m_max,temperature_2m_min${tempUnitString}&timezone=America%2FNew_York&forecast_days=1`
        );

        if (!response.ok) {
          throw new Error("failed to load data");
        }

        const data = await response.json();

        setCurrentConditions({ ...data }); // to do: fix this so it doesn't add data if bad response
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
  }, [lat, lon]);

  if (error) {
    console.log(error);
  }

  console.log("current conditions is:", currentConditions);

  let content;

  if (isFetching) {
    content = <p>Loading...</p>;
  }

  if (!isFetching) {
    content = !isFetching && (
      <>
        <h3>{currentConditions.current.temperature_2m}°</h3>
        <p>
          {`H:${currentConditions.daily.temperature_2m_max}° L:${currentConditions.daily.temperature_2m_min}°`}
        </p>
        <h4>{city}</h4>
      </>
    );
  }

  return content;
}
