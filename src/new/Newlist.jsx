import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Newlist({ movie, id }) {
  const [newlist, setnewlist] = useState([]);
  const [load, setloda] = useState(true);
  const nav = useNavigate();

  useEffect(() => {
    setnewlist(movie);
    setloda(false);
  }, []);

  useEffect(() => {
    if (!load) {
      const kindWrap = document.querySelector(".kind_wrap");
      const slider = kindWrap.querySelector(".slider");
      const slideLis = slider.querySelectorAll("li");
      const moveButton = document.querySelector(".arrow");

      if (kindWrap && slider && slideLis.length > 0 && moveButton) {
        // 위의 요소들이 모두 존재하는 경우에만 실행
        const liWidth = slideLis[0].clientWidth;
        const sliderWidth = liWidth * slideLis.length;
        slider.style.width = `${sliderWidth}px`;

        let currentIdx = 0;
        let translate = 0;

        moveButton.addEventListener("click", moveSlide);

        function moveSlide(event) {
          event.preventDefault();
          if (event.target.className === "next") {
            if (currentIdx < slideLis.length - 5) {
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
                        // window.location.reload();
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

export default Newlist;
