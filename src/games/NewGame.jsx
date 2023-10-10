import React, { useRef, useEffect, useState } from "react";
import "./NewGame.css";

import USER from "../img/You.png";
const CANVAS_WIDTH = 370;
const CANVAS_HEIGHT = 430;
const CREAT_BALL_SECOND = 1000;
const CHAR_SIZE = 30; // Char의 크기
const CHAR_SPEED = 20;
const BALL_RADIUS = 5;
const MOBILE_CHAR_MOVE = 10;
const DIRECTIONS = {
  LEFT: "left",
  RIGHT: "right",
  // UP: "up",
  // DOWN: "down",
};

function getRandomCoordinate(maxX, maxY) {
  const x = Math.floor(Math.random() * maxX) + 1; // 1 이상의 자연수
  return { x, y: -BALL_RADIUS };
}
function NewGame() {
  const canvasRef = useRef();
  const charRef = useRef();
  const [direction, setDirection] = useState("");
  const [position, setPosition] = useState({
    x: CANVAS_WIDTH - 225,
    y: CANVAS_HEIGHT - CHAR_SIZE,
  });
  const [imageLoaded, setImageLoaded] = useState(false); // 이미지 로드 상태
  const [score, setScore] = useState(0);
  const [coordinate, setCoordinate] = useState({ x: 0, y: 0 });
  const [balls, setBalls] = useState([]);
  const [isGameReset, setGameReset] = useState(false);
  const [gameStart, setGameStart] = useState(false);
  const preventScroll = (event) => {
    event.preventDefault();
  };

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //공만들기
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const createBall = () => {
      const randomSpeed = Math.floor(Math.random() * 5) + 1;
      const speed = randomSpeed * 10;
      const newBall = {
        id: Date.now(), // 고유한 아이디를 현재 시간을 이용해 생성
        x: coordinate.x,
        y: -20, // 맨 위에서 시작
        speed: speed, // 공의 속도
      };
      setBalls((prevBalls) => [...prevBalls, newBall]);
      // console.log(speed);
    };

    const moveBalls = () => {
      setBalls((prevBalls) =>
        prevBalls.map((ball) => ({
          ...ball,
          y: ball.y + ball.speed,
        }))
      );
    };

    const intervalId = setInterval(createBall, CREAT_BALL_SECOND); //

    const animationId = requestAnimationFrame(moveBalls);
    return () => {
      clearInterval(intervalId);
      cancelAnimationFrame(animationId);
    };
  }, [coordinate]);
  //만든공 그리기
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT); // Canvas 초기화

    balls.forEach((ball) => {
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, BALL_RADIUS, 0, Math.PI * 2);
      ctx.fillStyle = "#FFE650";
      ctx.fill();
      ctx.closePath();
      // console.log(ball.x, ball.y);
    });
  }, [balls, position]);

  //점수표시
  useEffect(() => {
    const intervalId = setInterval(() => {
      // 0.1초마다 count를 1씩 증가
      setScore((prevCount) => prevCount + 1);
    }, 100);

    return () => {
      clearInterval(intervalId); // 컴포넌트가 언마운트될 때 clearInterval로 타이머 정리
    };
  }, []);
  //방향키마다 키다운값 주기
  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.key) {
        case "ArrowLeft":
          setDirection(DIRECTIONS.LEFT);
          break;
        // case "ArrowUp":
        //   setDirection(DIRECTIONS.UP);
        //   break;
        case "ArrowRight":
          setDirection(DIRECTIONS.RIGHT);
          break;
        // case "ArrowDown":
        //   setDirection(DIRECTIONS.DOWN);
        //   break;
        default:
          setDirection("");
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  //canvas안에서 캐릭터 방향 및 최대 이동값 주기
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const moveChar = () => {
      // 현재 위치와 방향을 기반으로 새로운 위치 계산
      let newX = position.x;
      let newY = position.y;

      switch (direction) {
        case DIRECTIONS.LEFT:
          newX = Math.max(newX - 5, 0); // 왼쪽으로 이동, 최소값 0
          break;
        case DIRECTIONS.UP:
          newY = Math.max(newY - 5, CHAR_SIZE); // 위로 이동, 최소값 30
          break;
        case DIRECTIONS.RIGHT:
          newX = Math.min(newX + 5, CANVAS_WIDTH - CHAR_SIZE); // 오른쪽으로 이동, 최대값 (CANVAS_WIDTH - 캐릭터사이즈)
          break;
        case DIRECTIONS.DOWN:
          newY = Math.min(newY + 5, CANVAS_HEIGHT - CHAR_SIZE); //  아래로 이동, 최대값 (CANVAS_HEIGHT - 캐릭터사이즈)
          break;
        default:
          setDirection("Stop");
          break;
      }

      // 새로운 위치 설정
      setPosition({ x: newX, y: newY });
    };

    // 초마다 moveBall 함수 실행
    const intervalId = setInterval(moveChar, CHAR_SPEED);

    return () => {
      clearInterval(intervalId); // 컴포넌트 언마운트 시 clearInterval
    };
  }, [direction, position]);

  //canvas안에서 캐릭터 좌표가 바뀔때마다 지웠다 다시 그리기
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const char = charRef.current;

    if (imageLoaded) {
      // 이미지가 로드된 후에만 그림
      //
      ctx.drawImage(char, position.x, position.y, CHAR_SIZE, CHAR_SIZE); // 이미지 크기 조절
    }

    char.onload = () => {
      // 이미지 로드 완료 시 호출
      setImageLoaded(true);
    };

    char.src = USER; // 이미지 로드

    // if (direction === "left") {
    //   char.src = USER;
    // } else if (direction === "right") {
    //   char.src = USER;
    //   // } else if (direction === "up") {
    //   //   char.src = charFront;
    //   // } else if (direction === "down") {
    //   //   char.src = charFront;
    // } else {
    //   char.src = USER;
    // }

    return () => {
      char.onload = null; // 컴포넌트가 언마운트되면 onload 이벤트 핸들러 제거
    };
  }, [position, imageLoaded, direction]);

  useEffect(() => {
    const RandomCoordinate = () => {
      const newCoordinate = getRandomCoordinate(CANVAS_WIDTH, CANVAS_HEIGHT);
      setCoordinate(newCoordinate);
    };

    // 1초마다 랜덤 좌표 생성
    const intervalId = setInterval(RandomCoordinate, 1000);

    return () => {
      clearInterval(intervalId); // 컴포넌트 언마운트 시 타이머 정리
    };
  }, [coordinate]);

  function resetGame() {
    setScore(0); // 점수 초기화
    setGameReset(true); // 게임 초기화 상태를 true로 설정

    // 캐릭터 위치 초기화
    setPosition({
      x: CANVAS_WIDTH / 2,
      y: CANVAS_HEIGHT - CHAR_SIZE,
    });

    // 공 위치 초기화 (랜덤 좌표로 설정)
    setBalls([]);
    setGameReset(false); // 게임 초기화 상태를 false로 다시 설정
  }

  function calculateDistance(ballX, ballY, charX, charY) {
    const dx = ballX - charX;
    const dy = ballY - charY;
    return Math.sqrt(dx * dx + dy * dy);
  }

  // Ball과 Char 사이의 거리를 확인하여 Alert 표시
  function checkCollisionWithChar() {
    balls.forEach((ball) => {
      const distance = calculateDistance(
        ball.x,
        ball.y,
        position.x + CHAR_SIZE / 2,
        position.y + 10
      );
      if (distance <= CHAR_SIZE / 2) {
        alert(`Char와 Ball이 충돌했습니다! 당신의점수:${score}`);
        resetGame();
      }
      // console.log(distance);
    });
  }

  // 주기적으로 충돌 확인
  useEffect(() => {
    checkCollisionWithChar();
  }, [balls, position]);

  const handleGameStart = () => {};
  //////////////////////////////////////////////////////////////////////////////////////////////////////////모바일 버전
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // const moveCharUP = () => {
  //   const canvas = canvasRef.current;
  //   const ctx = canvas.getContext("2d");
  //   // 현재 위치와 방향을 기반으로 새로운 위치 계산
  //   let newX = position.x;
  //   let newY = position.y;
  //   newY = Math.max(newY - MOBILE_CHAR_MOVE, CHAR_SIZE); // 위로 이동, 최소값 30
  //   // 새로운 위치 설정
  //   setPosition({ x: newX, y: newY });
  // };
  // const moveCharDown = () => {
  //   const canvas = canvasRef.current;
  //   const ctx = canvas.getContext("2d");
  //   // 현재 위치와 방향을 기반으로 새로운 위치 계산
  //   let newX = position.x;
  //   let newY = position.y;
  //   newY = Math.min(newY + MOBILE_CHAR_MOVE, CANVAS_HEIGHT - CHAR_SIZE); // 위로 이동, 최소값 30
  //   // 새로운 위치 설정
  //   setPosition({ x: newX, y: newY });
  // };
  const moveCharRight = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    // 현재 위치와 방향을 기반으로 새로운 위치 계산
    let newX = position.x;
    let newY = position.y;
    newX = Math.min(newX + MOBILE_CHAR_MOVE, CANVAS_WIDTH - CHAR_SIZE); // 위로 이동, 최소값 30
    // 새로운 위치 설정
    setPosition({ x: newX, y: newY });
  };
  const moveCharLeft = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    // 현재 위치와 방향을 기반으로 새로운 위치 계산
    let newX = position.x;
    let newY = position.y;
    newX = Math.max(newX - MOBILE_CHAR_MOVE, 0); // 위로 이동, 최소값 30
    // 새로운 위치 설정
    setPosition({ x: newX, y: newY });
  };

  /////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <div className="game">
      <div className="container">
        <canvas
          className="canvas"
          ref={canvasRef}
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
          style={{ border: "3px solid red" }}
        ></canvas>
        <img
          ref={charRef}
          style={{ display: "none" }} // 이미지 숨기기
        />
      </div>
      <p className="score">Score:{score}</p>
      <div className="btns">
        {/* <button className="directionBTn up" onClick={moveCharUP}>
          ▲
        </button>
        <button className="directionBTn down" onClick={moveCharDown}>
          ▼
        </button> */}
        <button className="directionBTn left" onClick={moveCharLeft}>
          ◀
        </button>
        <button className="directionBTn right" onClick={moveCharRight}>
          ▶
        </button>
      </div>
      {/* <p>
          현재 좌표: x:{position.x} / y:{position.y}
        </p> */}
      {/* <p className="bounce-animation">현재 방향: {direction}</p>
       */}

      {/* <p>
        장애물좌표:X:{coordinate.x}/ Y:{coordinate.y}
      </p> */}
    </div>
  );
}

export default NewGame;
