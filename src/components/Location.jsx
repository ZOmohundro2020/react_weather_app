import { useState, useEffect } from "react";
import jsonData from "../util/weatherCodes.json";
import classes from "./Location.module.css";

// iso date helper function
function weatherCodeHelper(isoDateString, offset, weatherCode) {
  const date = new Date(isoDateString);
  const hoursUTC = date.getUTCHours();
  const offsetMinutes = offset / 60;
  const hoursLocal = hoursUTC + offsetMinutes / 60;
  //console.log("offset, offset minutes", offset, offsetMinutes);
  //console.log("hoursLocal: ", hoursLocal);

  // Check if it's day or night based on the local hours
  const isDaytime = hoursLocal >= 6 && hoursLocal < 18; // Assuming daytime is from 6 AM to 6 PM

  const dayOrNight = isDaytime ? "day" : "night";
  return getWeatherCodeString(weatherCode, dayOrNight);
}

function getWeatherCodeString(weatherCode, timeOfDay) {
  //console.log(timeOfDay);
  //console.log(typeof timeOfDay);
  return jsonData[weatherCode][timeOfDay];
}

export default function Location({ city, lat, lon, unit }) {
  let tempUnitString = "";
  let tempDisplayUnit = "C";
  if (unit === "fahrenheit") {
    tempUnitString = "&temperature_unit=fahrenheit";
    tempDisplayUnit = "F";
  }

  const [currentConditions, setCurrentConditions] = useState({});
  const [isFetching, setisFetching] = useState(true);
  const [error, setError] = useState(null);

  //console.log("lat,long", lat, lon);

  useEffect(() => {
    // declare the data fetching function
    const fetchData = async () => {
      setisFetching(true);

      try {
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code&daily=temperature_2m_max,temperature_2m_min${tempUnitString}&timezone=America%2FNew_York&forecast_days=1`
        );

        if (!response.ok) {
          throw new Error("failed to load data");
        }

        const data = await response.json();

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
  }, [lat, lon, tempUnitString]);

  if (error) {
    console.log(error);
  }

  console.log("current conditions is:", currentConditions);

  let content;

  //to do: fix issue when loading additional cities.

  if (isFetching) {
    content = <p>Loading...</p>;
  }

  if (!isFetching) {
    let description = weatherCodeHelper(
      currentConditions.current.time,
      currentConditions.utc_offset_seconds,
      currentConditions.current.weather_code
    );
    content = !isFetching && (
      <div className={classes["flex-container"]}>
        <div>
          <h3>
            {currentConditions.current.temperature_2m}°{tempDisplayUnit}
          </h3>
          <p>
            {`H:${currentConditions.daily.temperature_2m_max}° L:${currentConditions.daily.temperature_2m_min}°`}
          </p>
          <h4>{city}</h4>
        </div>
        <div>
          <img src={description.image} alt="current weather image"></img>
          <p>{description.description}</p>
        </div>
      </div>
    );
  }

  return content;
}

//original content code
/* <>
<h3>
  {currentConditions.current.temperature_2m}°{tempDisplayUnit}
</h3>
<p>
  {`H:${currentConditions.daily.temperature_2m_max}° L:${currentConditions.daily.temperature_2m_min}°`}
</p>        
<p>
  {description.description}
</p>
<img src={description.image} alt="current weather image"></img>
<h4>{city}</h4>
</> */
