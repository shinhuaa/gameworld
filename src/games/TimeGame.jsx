import React, { useEffect, useState } from "react";
import "./TimeGame.css";

function TimeGame() {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(true);
  const [reDisplay, setDisplay] = useState("hidden");

  useEffect(() => {
    if (running) {
      const intervalId = setInterval(() => {
        setTime(time + 0.01);
      }, 10);
      console.log(running);
      return () => {
        clearInterval(intervalId); // 컴포넌트 언마운트 시 clearInterval
      };
    }
  }, [time]);
  const formattedSeconds = time.toFixed(2);
  const handleStop = () => {
    setRunning(false);
    setDisplay("visible");
  };
  const handleRestart = () => {
    setTime(0);
    setRunning(true);
    setDisplay("hidden");
  };
  const sixthSense = Math.abs(formattedSeconds - 5).toFixed(2);

  return (
    <div className="Time_Container">
      <div className="five_box">
        <h1>Guess 5 Seconds!</h1>
        <span className="five">5</span>
      </div>
      <div className="Time_funtion">
        <button className="Time_Btns time_set" onClick={handleStop}>
          Stop
        </button>
        <p style={{ visibility: `${reDisplay}` }}>점수:{formattedSeconds}</p>
        <button
          className="Time_Btns time_set"
          style={{ visibility: `${reDisplay}` }}
          onClick={handleRestart}
        >
          ReStart
        </button>
        <span style={{ visibility: `${reDisplay}` }}>{sixthSense}</span>
      </div>
    </div>
  );
}

export default TimeGame;
