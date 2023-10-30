import React, { useEffect, useState } from "react";
import axios from "axios";
function Football() {
  const [players, setPlayer] = useState([]);
  const options = {
    method: "GET",
    url: "https://livescore6.p.rapidapi.com/matches/v2/list-by-league",
    params: {
      Category: "soccer",
      Ccd: "champions-league",
      Scd: "group-b",
      Timezone: "-7",
    },
    headers: {
      "X-RapidAPI-Key": "4df2a42b30mshf930c958ddc6500p1a30a2jsne5f9c750ac64",
      "X-RapidAPI-Host": "livescore6.p.rapidapi.com",
    },
  };
  useEffect(() => {
    fetchFootballData();
  }, []);

  const fetchFootballData = async () => {
    try {
      const response = await axios.get(options);
      console.log(response.data);
      setPlayer(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <article className="'pt-6">
      <header className="flex flex-clo gap-2 w-full px-4 z-50">
        input form
      </header>
      <section className="pt-6 flex flex-col justify-content items-center overflow-auto z-0">
        <div className="flex flex-row flex-wrap gap-[16px] items-center justify-center px-2 max-w-4xl">
          {players.length > 0 ? (
            players.map(({ url, Category }, index) => <div>{Category}</div>)
          ) : (
            <h2 className="font-medium text-lg text-slate-900 mb-1">
              데이터를 가져오지 못헀습니다.
            </h2>
          )}
        </div>
      </section>
    </article>
  );
}

export default Football;
