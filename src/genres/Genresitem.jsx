import axios from "axios";
import React, { useEffect, useState } from "react";
import Genresitemlist from "./Genresitemlist";
import Loading from "../loading/Loading";
import Auth from "../hoc/auth";
import { useDispatch, useSelector } from "react-redux";
import { genreslist } from "../_actions/genres_action";

const Genresitem = (props) => {
  const { gen } = props;

  const [list, setlist] = useState([]);
  const [load, setload] = useState(true);

  useEffect(() => {
    axios
      .get(`/api/movies/list/${gen}`)
      .then((res) => {
        setlist(res.data);
        setload(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [gen]);

  return <div>{load ? <Loading /> : <Genresitemlist list={list} />}</div>;
};

export default Genresitem;
