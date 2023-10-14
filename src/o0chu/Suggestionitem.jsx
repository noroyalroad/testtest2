import React from "react";
import { useNavigate } from "react-router-dom";

const Suggestionitem = (props) => {
  const { item } = props;
  const nav = useNavigate();

  return (
    <ul class="listBox">
      {item.map((item, index) => {
        return (
          <li
            class="item"
            key={index}
            onClick={() => {
              nav(`/detail/${item.movie_id}`);
            }}
          >
            <a href="">
              <img src={item.poster_path} alt="포스터" />
              <div>
                <h3>{item.kr_title}</h3>
              </div>
            </a>
          </li>
        );
      })}
    </ul>
  );
};

export default Suggestionitem;
