import axios from "axios";
import React, { useEffect, useState } from "react";

const Title = () => {
  const [title, settitle] = useState([]);

  useEffect(() => {
    axios.get("/api/movieTitle").then((res) => {
      console.log(res.data);
      settitle(res.data);
    });
  }, []);

  return (
    <div>
      {title.map((item, index) => {
        return <div key={index}>{item.korean_title}</div>;
      })}
    </div>
  );
};

export default Title;
