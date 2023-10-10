import React, { useEffect, useRef, useState } from "react";
import "./SniperGame.css";

function SniperGame() {
  const windowRef = useRef();

  const [pointer, setPointer] = useState({
    x: 0,
    y: 0,
  });
  const handelMouseMove = (e) => {
    setPointer({ x: e.clientX, y: e.clientY });
  };
  useEffect(() => {
    const windowElement = windowRef.current;
    windowElement.addEventListener("mousemove", handelMouseMove);

    return () => {
      windowElement.addEventListener("mousemove", handelMouseMove);
    };
  }, []);
  return (
    <div className="window" ref={windowRef}>
      <p>X는{pointer.x}</p>
      <p>Y는{pointer.y}</p>
      <div
        className="box1"
        style={{
          width: `${pointer.x}px`,
          height: "100px",
          top: `${pointer.y}`,
        }}
      ></div>
    </div>
  );
}

export default SniperGame;
