import axios from "axios";
import React, { useEffect, useState } from "react";

const MovieList = () => {
  const [movelist, setmovelist] = useState([]);

  useEffect(() => {
    axios
      .get("/api/movies/getmovie2")
      .then((res) => {
        console.log(res.data);
        setmovelist(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div>
      <div>dfdfdf</div>
    </div>
  );
};

export default MovieList;
