import React, { useEffect, useState } from "react";
import "./ReactionSpeed.css";
function ReactionSpeed() {
  const [second, setSceond] = useState(0);
  const [millisecond, setMillisecond] = useState(0); //게임이시작되고 지나가는 시간 밀리초로 계산
  const [speed, setSpeed] = useState(0); // 유저의 반응속도를 더하기위한 빈칸
  const [count, setCount] = useState(0); // 반응속도 테스트 횟수
  const [userSpeed, setUserSpeed] = useState(0); //유저의 반응속도
  const [text, setText] = useState("");
  const MIN = 2;
  const MAX = 6;
  const [randomSecond, setRandomSecond] = useState(
    Math.floor(Math.random() * (MAX - MIN + 1)) + MIN
  ); //미니멈과 맥시멈 사이의 랜덤한 숫자를 뽑아서 그숫자를 기준으로 게임작동하게하기
  const handleClickGame = () => {
    if (changColor().backgroundColor === "blue") {
      return;
    }
    console.log("click!");
    setCount(count + 1);
    const newSpeed = speed + millisecond; // 지금까지 나왔던 속도 더한값
    // const divideNewSpeed = Math.floor(newSpeed / 3); //더한값 게임횟수만큼 나누기 인데 아마 게임끝나고 나눠야될듯?
    setUserSpeed(millisecond);
    setSpeed(newSpeed);
    setMillisecond(0);
    setSceond(0);
    setRandomSecond(Math.floor(Math.random() * (MAX - MIN + 1)) + MIN);
    return {
      backgroundColor: "bule",
    };
  };
  useEffect(() => {
    const intervalId = setInterval(() => {
      setSceond(second + 1);
    }, 1000);
    return () => {
      clearInterval(intervalId); // 컴포넌트 언마운트 시 clearInterval
    };
  }, [second]);
  const changColor = () => {
    if (second > randomSecond) {
      return {
        backgroundColor: "yellow",
      };
    } else {
      return {
        backgroundColor: "blue",
      };
    }
  };
  useEffect(() => {
    if (second > randomSecond) {
      const intervalId = setInterval(() => {
        setMillisecond(millisecond + 1);
      }, 1);
      return () => {
        clearInterval(intervalId); // 컴포넌트 언마운트 시 clearInterval
      };
    }
  }, [millisecond, second]);
  useEffect(() => {
    if (second > randomSecond) {
      setText("Click me!");
    } else {
      setText("Waiting");
    }
  });

  return (
    <div className="maindiv">
      <div className="clickThis" style={changColor()} onClick={handleClickGame}>
        <h1>{text}</h1>
      </div>
      second:{second}||millisecond:{millisecond}||userSpeed:{userSpeed}
      /ms||speed:{speed}|| count:
      {count}||randomSecond:{randomSecond}
    </div>
  );
}

export default ReactionSpeed;
