import { Navigate, Route, Routes } from "react-router";
import Canvas from "./games/Canvas";
import Drawing from "./games/Drawing";
import SimpleSnakeGame from "./games/SimpleSnakeGame";
import Notfound from "./games/Notfound";
import Main from "./games/Main";
import NewGame from "./games/NewGame";
import SniperGame from "./games/SniperGame";
import TimeGame from "./games/TimeGame";
import Football from "./games/Football";
import ReactionSpeed from "./games/ReactionSpeed";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/canvas" element={<Canvas />} />
      <Route path="/drawing" element={<Drawing />} />
      <Route path="/simplesnakegame" element={<SimpleSnakeGame />} />
      <Route path="/newgame" element={<NewGame />} />
      <Route path="/sniperGame" element={<SniperGame />} />
      <Route path="/timeGame" element={<TimeGame />} />
      <Route path="/football" element={<Football />} />
      <Route path="/reactionspeed" element={<ReactionSpeed />} />
      {/* <Route path="/football" element={<Football />} />
      <Route path="/football" element={<Football />} />
       */}
      <Route path="/*" element={<Notfound />} />
    </Routes>
  );
}

export default App;
