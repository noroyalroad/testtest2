import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Newlist from "./Newlist";
import Loading from "../loading/Loading";

function NewMovie({ movie, id }) {
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

  console.log(newlist);

  return load ? <Loading /> : <Newlist movie={newlist} />;
}

export default NewMovie;
