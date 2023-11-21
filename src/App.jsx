import { useState } from "react";
import "./App.css";
import Header from "./components/Header.jsx";
import CityInput from "./components/CityInput.jsx";
import CityWeather from "./components/CityWeather.jsx";

function App() {
  const [cityList, setCityList] = useState([
    { name: "Initial Test City", current: 40, low: 36, high: 45 },
  ]);

  function updateCities(inputFieldData) {
    setCityList([
      { name: inputFieldData, current: "00", low: "00", high: "00" },
      ...cityList,
    ]); //remember these are strings
  }

  return (
    <>
      {/* {import.meta.env.VITE_SECRET_KEY}
      {import.meta.env.MY_KEY} */}

      <Header />
      <CityInput addCity={updateCities} />
      <CityWeather cityList={cityList} />
    </>
  );
}

export default App;
