import { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header.jsx";
import CityInput from "./components/CityInput.jsx";
import CityWeather from "./components/CityWeather.jsx";

function App() {
  const [cityList, setCityList] = useState([
    { name: "Initial Test City", current: 40, low: 36, high: 45 },
  ]);

  const [currentConditions, setCurrentConditions] = useState({});

  function updateCities(inputFieldData) {
    setCityList([
      { name: inputFieldData, current: "00", low: "00", high: "00" },
      ...cityList,
    ]); //remember these are strings
  }

  useEffect(() => {
    // declare the data fetching function
    const fetchData = async () => {
      const response = await fetch(
        "https://api.open-meteo.com/v1/forecast?latitude=45.4112&longitude=-75.6981&current=temperature_2m&daily=temperature_2m_max,temperature_2m_min&temperature_unit=fahrenheit&timezone=America%2FNew_York&forecast_days=1"
      );
      const data = await response.json();
      // console.log(data);
      // console.log(data.current.temperature_2m);
      // console.log(data.daily.temperature_2m_min);
      // console.log(data.daily.temperature_2m_max);

      setCurrentConditions({ ...data });
    };

    // call the function
    fetchData()
      // make sure to catch any error
      .catch(console.error);

    console.log("current conditions is:");
    console.log(currentConditions);
  }, []);

  return (
    <>
      {import.meta.env.VITE_SECRET_KEY}
      {import.meta.env.MY_KEY}

      <Header />
      <CityInput addCity={updateCities} />
      <CityWeather cityList={cityList} fetchedWeather={currentConditions} />
    </>
  );
}

export default App;
