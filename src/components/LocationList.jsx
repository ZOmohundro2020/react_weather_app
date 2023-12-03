import Location from "./Location.jsx";

export default function LocationList({ listOfLocations, unit }) {
  //console.log("listOfLocations prop is:", listOfLocations);
  console.log('inside locationlist, temp unit is: ',unit);

  const allLocations = listOfLocations.map((city, index) => (
    // turn this into a new component
    <Location key={index} myKey={index} city={city.name} lat={city.lat} lon={city.lon} unit={unit} />
  ));

  return <article>{allLocations}</article>;
}
