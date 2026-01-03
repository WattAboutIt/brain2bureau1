import { useEffect, useRef, useState } from "react";

function Pass() {
  const [pending, setPending] = useState(false);
  

  function handleClick() {
    setPending(true);
    setTimeout(() => {
      
      setPending(false);
    }, 2000);
  }

  return (
    <div>
      <input  type="text" placeholder="Enter text..." />
      <button disabled={pending} onClick={handleClick}>
        {pending ? "Focusing..." : "Focus"}
      </button>
    </div>
  );
}

export default Pass;
