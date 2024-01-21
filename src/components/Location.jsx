import { useState, useEffect } from "react";
import jsonData from "../util/weatherCodes.json";
import classes from "./Location.module.css";

// iso date helper function
function weatherCodeHelper(isoDateString, offset, weatherCode, is_day) {
  const date = new Date(isoDateString);
  const hoursUTC = date.getUTCHours();

  //testing
  //const minutesUTC = date.getUTCMinutes();
  //const
  //console.log("date is: ", date);

  // to do

  // fix this so it reflects actual location time. seems to always be based on my local time.
  // not currently using this section. has been replaced by API is_day

  const offsetMinutes = offset / 60;
  const hoursLocal = hoursUTC + offsetMinutes / 60;
  //console.log("offset, offset minutes", offset, offsetMinutes);
  //console.log("hoursLocal: ", hoursLocal);

  let dayOrNight = is_day;
  dayOrNight ? (dayOrNight = "day") : (dayOrNight = "night");

  // Check if it's day or night based on the local hours
  // const isDaytime = hoursLocal >= 6 && hoursLocal < 18; // Assuming daytime is from 6 AM to 6 PM

  // const dayOrNight = isDaytime ? "day" : "night";
  //console.log(dayOrNight);
  return getWeatherCodeString(weatherCode, dayOrNight);
}

function getWeatherCodeString(weatherCode, timeOfDay) {
  //console.log(timeOfDay);
  //console.log(typeof timeOfDay);
  return jsonData[weatherCode][timeOfDay];
}

function dayOfWeekHelper(offset) {
  const date = new Date();

  const daysOfWeek = [
    "Su",
    "Mo",
    "Tu",
    "We",
    "Th",
    "Fr",
    "Sa",
  ];

  let currentDayOfWeek = date.getDay();

  if (currentDayOfWeek + offset == 7) {
    currentDayOfWeek = 0;
    offset = 0;
  } else if (currentDayOfWeek + offset > 6) {
    currentDayOfWeek = -1;
  }

  let targetDay = currentDayOfWeek + offset;

  const dayString = daysOfWeek[targetDay];
  return dayString;
}

export default function Location({ city, lat, lon, unit, removeLocation }) {
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
    const fetchData = async () => {
      setisFetching(true);

      try {
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code,is_day&daily=temperature_2m_max,temperature_2m_min${tempUnitString}&forecast_days=5`
        );

        if (!response.ok) {
          throw new Error("failed to load data");
        }

        const data = await response.json();

        setCurrentConditions({ ...data });
      } catch (error) {
        setError(error.message); //to-do: add better error handling
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

  function deleteHandler() {
    //console.log("delete clicked");
    removeLocation({ lat, lon });
  }

  let content;

  //to do: fix issue when loading additional cities.

  if (isFetching) {
    content = <p>Loading...</p>;
  }

  if (!isFetching) {
    let description = weatherCodeHelper(
      currentConditions.current.time,
      currentConditions.utc_offset_seconds,
      currentConditions.current.weather_code,
      currentConditions.current.is_day
    );
    content = !isFetching && (
      <div className={classes["gridContainer"]}>
        <div className={classes["deleteBtn"]}>
          <button type="button" onClick={deleteHandler}>
            <span>X</span>
          </button>
        </div>
        <div className={classes["temps"]}>
          <div>
            <br></br>
            <h3>
              {currentConditions.current.temperature_2m}°{tempDisplayUnit}
            </h3>
            <p>
              {`H:${currentConditions.daily.temperature_2m_max[0]}° L:${currentConditions.daily.temperature_2m_min[0]}°`}
            </p>
          </div>
        </div>
        <div className={classes["icons"]}>
          <img
            src={description.image}
            alt={`Weather icon: ${description.description}`}
          ></img>
          <span>{description.description}</span>
        </div>
        <div className={classes["forecast"]}>
          <div>
            <span>20 | 12</span>
            <img
              src={description.image}
              alt={`Weather icon: ${description.description}`}
            ></img>
            <span>{dayOfWeekHelper(0)}</span>
          </div>
          <div>
            {" "}
            <span>20 | 12</span>
            <img
              src={description.image}
              alt={`Weather icon: ${description.description}`}
            ></img>
            <span>{dayOfWeekHelper(1)}</span>
          </div>
          <div>
            {" "}
            <span>20 | 12</span>
            <img
              src={description.image}
              alt={`Weather icon: ${description.description}`}
            ></img>
            <span>{dayOfWeekHelper(2)}</span>
          </div>
          <div>
            {" "}
            <span>20 | 12</span>
            <img
              src={description.image}
              alt={`Weather icon: ${description.description}`}
            ></img>
            <span>{dayOfWeekHelper(3)}</span>
          </div>
          <div>
            {" "}
            <span>20 | 12</span>
            <img
              src={description.image}
              alt={`Weather icon: ${description.description}`}
            ></img>
            <span>{dayOfWeekHelper(4)}</span>
          </div>
        </div>
        <div className={classes["city"]}>
          <h4>{city}</h4>
        </div>
      </div>
    );

    // content = !isFetching && (
    //   <div className={classes["flex-container"]}>
    //     <div>
    //       <h3>
    //         {currentConditions.current.temperature_2m}°{tempDisplayUnit}
    //       </h3>
    //       <p>
    //         {`H:${currentConditions.daily.temperature_2m_max[0]}° L:${currentConditions.daily.temperature_2m_min[0]}°`}
    //       </p>
    //       <h4>{city}</h4>
    //     </div>
    //     <div>
    //       <img
    //         src={description.image}
    //         alt={`Weather icon: ${description.description}`}
    //       ></img>
    //       <p>{description.description}</p>
    //     </div>
    //     <div>
    //       <button type="button" onClick={deleteHandler}>
    //         x
    //       </button>
    //     </div>
    //   </div>
    // );
  }

  return content;
}
