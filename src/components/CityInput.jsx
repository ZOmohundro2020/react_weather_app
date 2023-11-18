import { FaMagnifyingGlass } from "react-icons/fa6";

export default function CityInput({ addCity }) {
  function submitHandler(event) {
    event.preventDefault();

    const fd = new FormData(event.target);
    const inputFieldData = fd.get("cityInput");
    console.log("input is:", inputFieldData);

    addCity(inputFieldData);
  }

  

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
        ></input>
        <button>Add City</button>
      </form>
    </>
  );
}
