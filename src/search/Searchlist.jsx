import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Searchitem from "./Searchitem";
import Header from "../nav/Header";
import Footer from "../footer/Footer";


const Searchlist = (props) => {
  const a = useParams();

  console.log(a);

  const [list, setlist] = useState([]);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    axios.get(`/api/movie/search/${a.search}`).then((res) => {
      console.log(res.data);
      setlist(res.data);
      setloading(false);
    });
  }, [a]);
  return (
    <div>
      <Header />
      <div className="listWrap webSize">
        <h5 className="cateTitle">{a.search}에 대한 검색결과</h5>
      </div>
      {loading ? <h1>load...</h1> : <Searchitem item={list} />}
      <Footer/>
    </div>
  );
};

export default Searchlist;
