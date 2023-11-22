import { useState } from "react";
import "./App.css";
import Header from "./components/Header.jsx";
import CityInput from "./components/CityInput.jsx";
import LocationList from "./components/LocationList.jsx";

function App() {
  const [listOfLocations, setListOfLocations] = useState([
    { name: "Initial Test City", current: 40, low: 36, high: 45 },
  ]);

  function updateCities(inputFieldData) {
    setListOfLocations([{ name: inputFieldData }, ...listOfLocations]);
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
