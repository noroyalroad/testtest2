import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Genreslist = () => {
  const a = useParams();
  console.log(a.genres);

  const [genres, setgenres] = useState([]);

  useEffect(() => {
    axios.get(`/api/movies/list/${a.genres}`).then((res) => {
      console.log(res.data);
    });
  });

  return <div>dddd</div>;
};

export default Genreslist;
