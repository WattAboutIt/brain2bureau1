import { useState, useRef } from "react";
import "./checkbox.css";

function Checkbox() {
  const [gender, setGender] = useState("");
  const [city, setCity] = useState("delhi");
  const inputRef = useRef(null);

  function handleFocus() {
    inputRef.current.focus();
    inputRef.current.style.backgroundColor = "yellow";
    inputRef.current.value = city; // ✅ Corrected
  }

  return (
    <div>
      {/* Gender Radio Buttons */}
      <input
        type="radio"
        id="male"
        name="gender"
        value="male"
        onChange={(e) => setGender(e.target.value)}
      />
      <label htmlFor="male">Male</label>

      <input
        type="radio"
        id="female"
        name="gender"
        value="female"
        onChange={(e) => setGender(e.target.value)}
      />
      <label htmlFor="female">Female</label>

      <input
        type="radio"
        id="other"
        name="gender"
        value="other"
        onChange={(e) => setGender(e.target.value)}
      />
      <label htmlFor="other">Other</label>

      <p>Selected gender: {gender}</p>

      {/* City Dropdown */}
      <label>City: </label>
      <select onChange={(e) => setCity(e.target.value)} value={city}>
        <option value="delhi">Delhi</option>
        <option value="mumbai">Mumbai</option>
        <option value="kolkata">Kolkata</option>
        <option value="chennai">Chennai</option>
      </select>

      <p>Selected city: {city}</p>

      {/* Input with useRef */}
      <input type="text" ref={inputRef} placeholder="Click button to focus" />
      <button onClick={handleFocus}>Focus</button>
    </div>
  );
}

export default Checkbox;
