import React from "react";
import { useNavigate } from "react-router-dom";

const Searchitem = (props) => {
  const nav = useNavigate();
  const { item } = props;
  return (
    <div className="minhi">
      {item.length === 0 ? (
        <h1>결과옶음</h1>
      ) : (
        <div className="listWrap webSize">
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
        </div>
      )}
    </div>
  );
};

export default Searchitem;
