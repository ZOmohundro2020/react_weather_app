import { useState } from "react";
import "./App.css";
import Header from "./components/Header.jsx";
import CityInput from "./components/CityInput.jsx";
import LocationList from "./components/LocationList.jsx";

function App() {
  const [listOfLocations, setListOfLocations] = useState([
    { name: "Initial Test City", lat: 45.4112, lon: -75.6981 },
  ]);
  const [temperatureUnit, setTemperatureUnit] = useState("fahrenheit");

  function updateCities(inputFieldData) {
    
    let dupeCheck = listOfLocations.findIndex(
      ({ name }) => name === inputFieldData.name
    );
    console.log("dupe check is: ", dupeCheck);

    if (inputFieldData.name && dupeCheck < 0) {
      setListOfLocations([
        {
          name: inputFieldData.name,
          lat: inputFieldData.lat,
          lon: inputFieldData.lon,
        },
        ...listOfLocations,
      ]);
    }
  }

  return (
    <>
      {/* {import.meta.env.VITE_SECRET_KEY}
      {import.meta.env.MY_KEY} */}

      <Header />
      <CityInput addCity={updateCities} />
      <LocationList listOfLocations={listOfLocations} unit={temperatureUnit}/>
    </>
  );
}

export default App;
