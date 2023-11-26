import { useState } from "react";
import "./App.css";
import Header from "./components/Header.jsx";
import CityInput from "./components/CityInput.jsx";
import LocationList from "./components/LocationList.jsx";

function App() {
  const [listOfLocations, setListOfLocations] = useState([
    { name: "Initial Test City", lat: 45.4112, lon: -75.6981 },
  ]);

  function updateCities(inputFieldData) {
    setListOfLocations([
      {
        name: inputFieldData.name,
        lat: inputFieldData.lat,
        lon: inputFieldData.lon,
      },
      ...listOfLocations,
    ]);
  }

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
