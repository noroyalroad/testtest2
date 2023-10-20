import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MovieInfo from "./Movieinfo";
import Header from "../nav/Header";
import Footer from "../footer/Footer";
import CommentInput from "../comment/Commentinput";
import CommentList2 from "../comment/CommentList2";
import NewMovie from "../new/NewMovie 2";

import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import Auth from "../hoc/auth";
import Commentlist from "../comment/Commentlist";
import Withmovie from "../withmovie/Withmovie";

const Getdetail = ({ onPlay }) => {
  const { movie_id } = useParams();
  const [detailmv, setdetailmv] = useState([]);

  // window.location.reload();

  useEffect(() => {
    axios
      .get(`/api/movie/getdetail/${movie_id}`)
      .then((res) => {
        console.log(res.data);
        setdetailmv(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [movie_id]);

  return (
    <div>
      <Header />
      <div className="DW">
        <MovieInfo movie={detailmv} />
        <CommentInput movie_id={movie_id} />
        {/* <CommentList2 /> */}
        <Commentlist movie_id={movie_id} />
        <h5 className="cateTitle marT_20">같이 보면 좋은 영화</h5>
        <Withmovie movie_id={movie_id} />
      </div>
      <Footer />
    </div>
  );
};

export default Auth(Getdetail, true);
