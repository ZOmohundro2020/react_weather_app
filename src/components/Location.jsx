import { useState, useEffect } from "react";

// to do
// there is something going on in this file. The listOfLocations prop seems correct.
// Something keeps currentConditions from grabbing right data.
// Maybe these need to be held in state? I don't get it.
// Works on a couple of refreshes. I've seen this before.

export default function Location({ city, lat, lon }) {
  const [currentConditions, setCurrentConditions] = useState({});
  const [isFetching, setisFetching] = useState(true);
  const [error, setError] = useState();


  console.log("lat,long", lat, lon);

  useEffect(() => {
    // declare the data fetching function
    const fetchData = async () => {
      setisFetching(true);

      try {
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m&daily=temperature_2m_max,temperature_2m_min&temperature_unit=fahrenheit&timezone=America%2FNew_York&forecast_days=1`
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
