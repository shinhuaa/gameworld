import React from "react";
import SimpleSnakeGame from "./SimpleSnakeGame";
import Drawing from "./Drawing";
import { Link } from "react-router-dom";

function Main() {
  return (
    <div>
      <Link to="/drawing">
        <button>Go Draw</button>
      </Link>
      <Link to="/simplesnakegame">
        <button>Go Snake</button>
      </Link>
      <Link to="/newgame">
        <button>Go newgame</button>
      </Link>
      <Link to="/sniperGame">
        <button>Go SniperGame</button>
      </Link>
      <Link to="/timeGame">
        <button>Go TimeGame</button>
      </Link>
      <Link to="/football">
        <button>Go football</button>
      </Link>
      <Link to="/reactionspeed">
        <button>Go reactionspeed</button>
      </Link>
    </div>
  );
}
export default Main;
