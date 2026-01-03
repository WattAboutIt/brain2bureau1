import { useState } from "react";
import Sabin from "./a1";

function Clock({ color }) {
  return (
    <div
      style={{
        color: color,          // dynamic text color
        fontSize: "30px",
        
      }}
    >
      Counter
    </div>
  );
}

export default Clock;
