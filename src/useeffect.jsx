import { useState, useRef, useEffect } from "react";

function Sabin() {
  const [total, setTotal] = useState(0); // single source of truth (ticks)
  const intervalRef = useRef(null);

  // cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, []);

  function start() {
    if (intervalRef.current) return; // prevent multiple intervals
    intervalRef.current = setInterval(() => {
      setTotal(prev => prev + 1);
    }, 1000);
  }

  function stop() {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }

  function reset() {
    stop();
    setTotal(0);
  }

  // compute values on base-5 clock:
  const seconds = total % 5;
  const minutes = Math.floor(total / 5) % 5;
  const hours = Math.floor(total / 25); // 5 seconds * 5 minutes = 25 ticks per hour

  return (
    <div style={{ textAlign: "center", fontFamily: "monospace" }}>
      <h1>
        Time:{" "}
        {String(hours).padStart(2, "0")}:
        {String(minutes).padStart(2, "0")}:
        {String(seconds).padStart(2, "0")}
      </h1>
      <button onClick={start}>Start</button>
      <button onClick={stop}>Stop</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}

export default Sabin;
