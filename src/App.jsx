import { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header.jsx";
import CityInput from "./components/CityInput.jsx";
import LocationList from "./components/LocationList.jsx";
import getLatLong from "./util/getLatLong.js";

function App() {
  const [listOfLocations, setListOfLocations] = useState([
    { name: "Initial Test City", lat: 45.4112, long: -75.6981 },
  ]);

  const [coordinates, getCoordinates] = useState();

  function updateCities(inputFieldData) {
    setListOfLocations([{ name: inputFieldData }, ...listOfLocations]);
  }

  useEffect(() => {
    async function fetchLatLong() {
      const newCoords = await getLatLong("Springfield");
      getCoordinates(newCoords);
    }

    fetchLatLong();
  }, []);

  console.log(coordinates);

  return (
    <>
      {/* {import.meta.env.VITE_SECRET_KEY}
      {import.meta.env.MY_KEY} */}

      <Header />
      <CityInput addCity={updateCities} />
      <LocationList listOfLocations={listOfLocations} />
    </>
  );
}

export default App;
