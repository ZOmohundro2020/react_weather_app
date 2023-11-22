import { useState, useEffect } from "react";

export default function Location({ city }) {
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

  let content;

  content = isFetching && <p>Loading...</p>;

  content = !isFetching && (
    <>
      <h3>{currentConditions.current.temperature_2m}°</h3>
      <p>
        {`H:${currentConditions.daily.temperature_2m_max}° L:${currentConditions.daily.temperature_2m_min}°`}
      </p>
      <h4>{city.name}</h4>
    </>
  );

  return content;
}
