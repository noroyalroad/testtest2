import React, { useEffect, useState } from "react";
import StarRating from "../etc/star/RatingStar";
import UserRatingBt from "./UserRatingBt";

import { useUserStore } from "./../store";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import Auth from "../hoc/auth";

const Moviedetailinfo = ({ movied }) => {
  const i = 0;
  const dispatch = useDispatch();

  const [movies, setmovie] = useState([]);
  const [load, setload] = useState(true);
  const [Rating, setRating] = useState(0);
  const [res, setres] = useState([]);

  const user = useSelector((state) => state.user);
  let email = "";
  if (user !== undefined && user.userData !== undefined) {
    email = user.userData.email;
  }
  console.log(email);

  // const token = Cookies.get("token"); // 수정: get 메서드 사용
  // console.log("쿠키에 설정된 토큰:", token);

  // const headers = {
  //   Authorization: `Bearer ${token}`,
  // };

  // 서버로 요청을 보냄
  // useEffect(() => {
  //   fetch("http://localhost:4000/api/auth/user-info", { headers })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       // 서버에서 받은 데이터를 처리

  //       setres(data);
  //     })
  //     .catch((error) => {
  //       console.error("Error:", error);
  //     });
  // }, []);
  // console.log(res.email);

  useEffect(() => {
    setmovie(movied);
    setload(false);

    // Redux 상태 초기화
  }, [movied]);

  // if (movies.length > 0 && movies[0].poster_path) {
  //   console.log("dd");
  // }
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
            <p className="ottList">{movies[i].ott_logos === "N/A" ? <h3>ott 지원 x</h3> : console.log(typeof movies[i].ott_logos)}</p>
          </div>
          <div className="marB_20">
            <button>트레일러 보기</button>
          </div>
          <UserRatingBt user_id={email} movie_id={movies[i].movie_id} korean_title={movies[i].kr_title} />
        </div>
      ) : (
        <h1>궤모띠 ㅇㅅㅇ</h1>
      )}
    </div>
  );
};

export default Moviedetailinfo;
