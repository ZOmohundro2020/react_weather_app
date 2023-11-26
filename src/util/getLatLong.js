export default async function getLatLong(cityName) {
  try {
    const response = await fetch(
      `https://geocode.maps.co/search?q=${cityName}`
    );
    const data = await response.json();
    console.log('inside getLatLong, got data');
    //const filteredData = data.filter((location) => Object.values(location).includes("city"))
    const reducedData = data.reduce(function(prev,current) {
      return (prev && prev.importance > current.importance) ? prev : current
    })

    if (!response.ok) {
      throw new Error("failed to load data");
    }

    return reducedData;
  } catch (error) {
    return error.message;
  }
}
