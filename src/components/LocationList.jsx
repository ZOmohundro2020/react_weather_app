import Location from "./Location.jsx";

export default function LocationList({ listOfLocations }) {
  console.log("listOfLocations prop is:", listOfLocations);

  const allLocations = listOfLocations.map((city, index) => (
    // turn this into a new component
    <Location key={index} myKey={index} city={city.name} lat={city.lat} lon={city.lon} />
  ));

  return <article>{allLocations}</article>;
}
