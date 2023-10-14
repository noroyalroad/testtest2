import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Auth from "../hoc/auth";

const Genresitemlist = (props) => {
  const { list } = props;
  const nav = useNavigate();
  const user = useSelector((state) => state.user);
  const [Load, setLoad] = useState(true);
  console.log(list);

  useEffect(() => {
    const loadImage = new Image();
    loadImage.src = list.poster_path;
    loadImage.onload = () => {
      // 이미지가 로드된 후에 할 일
      setLoad(false); // 로딩 완료 상태로 변경
    };
  }, []);

  return (
    <div className="listWrap webSize">
      <ul class="listBox">
        {list.map((item, index) => {
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
  );
};

export default Genresitemlist;
