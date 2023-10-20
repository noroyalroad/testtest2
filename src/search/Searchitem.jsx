import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { click } from "../_actions/click_action";
import { useDispatch, useSelector } from "react-redux";

const Searchitem = (props) => {
  const nav = useNavigate();
  const dispath = useDispatch();
  const { item } = props;

  const clicks = useSelector((state) => state.user.clickdata);

  useEffect(() => {
    if (clicks !== undefined) {
      window.scrollTo(0, clicks);
      console.log(clicks);
    }
  }, []);
  return (
    <div className="minhi">
      {item.length === 0 ? (
        <div className="listWrap webSize">결과 없음..</div>
      ) : (
        <div className="listWrap webSize">
          <ul class="listBox">
            {item.map((item, index) => {
              return (
                <li
                  class="item"
                  key={index}
                  onClick={(event) => {
                    event.preventDefault();
                    dispath(click(window.scrollY));

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
