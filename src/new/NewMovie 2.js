import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function NewMovie() {
  const [newlist, setnewlist] = useState([]);
  const [load, setloda] = useState(true);
  const nav = useNavigate();

  useEffect(() => {
    axios
      .get("/api/newList")
      .then((res) => {
        setnewlist(res.data);
        setloda(false);
      })
      .catch((error) => {
        alert("arror!");
      });
  }, []);

  useEffect(() => {
    if (!load) {
      const kindWrap = document.querySelector(".kind_wrap");
      const slider = kindWrap.querySelector(".slider");
      const slideLis = slider.querySelectorAll("li");
      const moveButton = document.querySelector(".arrow");

      /* ul 넓이 계산해 주기 */
      const liWidth = slideLis[0].clientWidth;
      const sliderWidth = liWidth * slideLis.length;
      slider.style.width = `${sliderWidth}px`;

      /* 리스너 설치하기 */
      let currentIdx = 0;
      let translate = 0;
      moveButton.addEventListener("click", moveSlide);

      function moveSlide(event) {
        event.preventDefault();
        if (event.target.className === "next") {
          if (currentIdx < slideLis.length - 5) {
            // 5개의 아이템이 화면에 보이므로, 5를 뺀 값까지 이동이 가능합니다.
            translate -= liWidth;
            slider.style.transform = `translateX(${translate}px)`;
            currentIdx += 1;
          }
        } else if (event.target.className === "prev") {
          if (currentIdx > 0) {
            translate += liWidth;
            slider.style.transform = `translateX(${translate}px)`;
            currentIdx -= 1;
          }
        }
      }
    }
  }, [load]);
  console.log(newlist);

  return (
    <div style={{ position: "relative" }}>
      {load ? (
        <h1>loda...</h1>
      ) : (
        <div style={{ position: "relative" }}>
          <div className="kind_wrap">
            <div className="kind_slider">
              <ul className="slider">
                {newlist.map((item, index) => {
                  return (
                    <li
                      key={index}
                      onClick={() => {
                        nav(`/detail/${item.movie_id}`);
                      }}
                    >
                      <a>
                        <img src={item.poster_path} alt="" />
                        <div>
                          <h3 className="movieTitle">{item.kr_title}</h3>
                        </div>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          <div className="arrow">
            <a href="" className="prev">
              &lt;
            </a>
            <a href="" className="next">
              &gt;
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

export default NewMovie;
