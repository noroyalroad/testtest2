import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Auth from "../hoc/auth";
import { click } from "../_actions/click_action";

const Genresitemlist = (props) => {
  const { list } = props;
  const nav = useNavigate();
  // const user = useSelector((state) => state.user);
  const [Load, setLoad] = useState(true);
  console.log(list);
  const dispatch = useDispatch();

  const clicks = useSelector((state) => state.user.clickdata);

  useEffect(() => {
    if (clicks !== undefined) {
      window.scrollTo(0, clicks);
      console.log(clicks);
    }
  }, []);
  //  페이지로 왔을 때 저장된 커서 위치로 이동

  return (
    <div className="listWrap webSize" id="listPage">
      <ul class="listBox">
        {list.map((item, index) => {
          return (
            <li
              class="item"
              key={index}
              onClick={(event) => {
                event.preventDefault();

                dispatch(click(window.scrollY));

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
  );
};

export default Genresitemlist;
