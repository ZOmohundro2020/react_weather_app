//import { useState, useRef } from "react";
import { useState, useRef } from "react";
import getLatLong from "../util/getLatLong.js";
import { FaMagnifyingGlass } from "react-icons/fa6";

function isError(obj) {
  return Object.prototype.toString.call(obj) === "[object Error]";
}

export default function CityInput({ addCity }) {
  const [error, setError] = useState(null);
  const inputRef = useRef();
  //const [coordinates, setCoordinates] = useState(); // for testing only
  //const [tempCityData, setTempCityData] = useState(); // for testing only

  function submitHandler(event) {
    event.preventDefault();

    const fd = new FormData(event.target);
    const inputFieldData = fd.get("cityInput");
    // console.log("input is:", inputFieldData);
    // console.log(inputFieldData.trim().length);

    if (inputFieldData.trim().length < 1) {
      return;
    }

    // add regex?

    async function fetchLatLong(city) {
      const newCoords = await getLatLong(city);
      const checkForError = isError(newCoords);
      console.log(checkForError);
      if (checkForError) {
        setError(newCoords);
        return;
      }

      console.log("new coords is: ", newCoords);
      console.log(typeof newCoords);
      //setCoordinates(newCoords);

      const cityDataModified = {
        name: newCoords.display_name,
        lat: +newCoords.lat,
        lon: +newCoords.lon,
      };

      //setTempCityData(cityDataModified);
      addCity(cityDataModified);
      setError(null);
    }

    fetchLatLong(inputFieldData);
    inputRef.current.value = "";
    inputRef.current.focus();
  }
  //console.log("coordinates is: ",coordinates); // for testing only
  //console.log("tempCityData is: ",tempCityData); // for testing only

  return (
    <>
      <form onSubmit={submitHandler}>
        <label htmlFor="cityInput">
          <FaMagnifyingGlass />
        </label>
        <input
          id="cityInput"
          name="cityInput"
          placeholder="Enter a City"
          ref={inputRef}
        ></input>
        <button>Add City</button>
      </form>
      {error ? <p>Error: {error.message} </p> : null}
    </>
  );
}
