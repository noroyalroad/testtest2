import React, { useEffect, useRef, useState } from "react";
import StarRating from "../etc/star/RatingStar";
import UserRatingBt from "./UserRatingBt";

import { useUserStore } from "./../store";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import Auth from "../hoc/auth";
import Loading from "../loading/Loading";
import Getstar from "./Getstar";
import ScrollToTopButton from "../scrolltop/ScrolltoptoButton";

const Moviedetailinfo = ({ movied }) => {
  const i = 0;
  const dispatch = useDispatch();

  const [movies, setmovie] = useState([]);
  const [load, setload] = useState(true);
  const [Rating, setRating] = useState(0);
  const [res, setres] = useState([]);

  const [modalopen, setModalOpen] = useState(false);
  const modalBackground = useRef();
  // 날짜 형식 바꿔서
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const user = useSelector((state) => state.user);
  let email = "";
  if (user !== undefined && user.userData !== undefined) {
    email = user.userData.email;
  }
  console.log(email);
  useEffect(() => {
    // 페이지가 로드될 때 스크롤을 상단으로 이동
    window.scrollTo(0, 0);
  });

  useEffect(() => {
    setmovie(movied);
    setload(false);
  }, [movied]);

  const disableBodyScroll = () => {
    document.body.style.overflow = "hidden";
  };

  const enableBodyScroll = () => {
    document.body.style.overflow = "visible";
  };

  let ott = [];

  if (movies.length > 0 && movies[0].ott_logos) {
    ott = movies[0].ott_logos.split(",");
  }
  if (!load && movies.length > 0 && movies[0].trailer_url === "") {
    console.log("ye");
  }

  return (
    <div className="detailedPageWrap marT_20">
      <div className="posrtBox marR_20">{movies && movies.length > 0 && movies[0].poster_path ? <img src={movies[i].poster_path} alt="영화 포스터" /> : <h1>없음</h1>}</div>
      {movies.length > 0 ? (
        <div className="movieInfo">
          <h4 className="movie_title">{movies[0].kr_title}</h4>
          <p>
            <span>감독 : </span>
            <span>{movies[i].directors}</span>
          </p>
          <p>
            <span>러닝타임 : </span>
            <span>{movies[i].runtime} 분</span>
          </p>
          <p>
            <span>장르 : </span>
            <span>{movies[i].genres}</span>
          </p>
          <p>
            <span>배우 : </span>
            <span>{movies[i].actors.slice(0, 100)}</span>
          </p>

          <p>
            <span>개봉일 : </span>
            <span>{movies[i].release_date}</span>
          </p>
          <p>
            <span>줄거리 : </span>
            <span>{movies[i].overview}</span>
          </p>

          <div className="marB_20">
            <h5>시청 가능한 OTT</h5>
            {ott.length > 0 ? (
              <p className="ottList">
                {ott.map((item, index) => {
                  return <img key={index} className="marR_5" src={item} alt="ott 로고" />;
                })}
              </p>
            ) : (
              <h3>지원하는 OTT 없음</h3>
            )}
            {/* <p className="ottList">{movies[i].ott_logos === "N/A" ? <h3>ott 지원 x</h3> : ott}</p> */}
          </div>
          <div className="marB_20">
            {movies[i].trailer_url === "" ? (
              <div></div>
            ) : (
              <button
                className="btn"
                onClick={() => {
                  setModalOpen(true);
                  disableBodyScroll();
                }}
              >
                트레일러 보기
              </button>
            )}
          </div>
          {modalopen && (
            <div
              className="modal-container"
              ref={modalBackground}
              onClick={(e) => {
                if (e.target === modalBackground.current) {
                  setModalOpen(false);
                }
              }}
            >
              <div className="modar">
                <button
                  className="close-btn"
                  onClick={() => {
                    setModalOpen(false);
                    enableBodyScroll();
                  }}
                >
                  X
                </button>

                <iframe id="ytvideo" width="560" height="315" src={movies[i].trailer_url} frameBorder="0" allowFullScreen></iframe>
              </div>
            </div>
          )}
          {/* <UserRatingBt user_id={email} movie_id={movies[i].movie_id} korean_title={movies[i].kr_title} /> */}
          <Getstar user_email={email} movie_id={movies[i].movie_id} />
          <ScrollToTopButton />
        </div>
      ) : (
        <h1>
          <Loading />
        </h1>
      )}
    </div>
  );
};

export default Moviedetailinfo;
