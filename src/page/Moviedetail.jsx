import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Commentwrite from "../comment/Commentwrite";
import Commentlist from "../comment/Commentlist";

const Moviedetail = () => {
  let param = useParams();
  console.log(param);
  let i = 0;

  const [movie, setmovie] = useState([]);
  const [load, setload] = useState(true);

  let body = {
    title: param.movie_id,
  };

  useEffect(() => {
    axios
      .post("/api/addClick", body)
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  useEffect(() => {
    axios
      .get(`/api/detail/${param.movie_id}`)
      .then((res) => {
        setmovie(res.data);
        setload(false);
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // let img = movie[i].poster_path;
  // console.log(img);
  return (
    <div>
      {load ? (
        <h1>load..</h1>
      ) : (
        <Card style={{ width: "18em" }}>
          <Card.Img variant="top" src={movie[i].poster_path} />
          <Card.Body>
            <Card.Title>{movie[i].title}</Card.Title>
            <Card.Text>{movie[i].directors}</Card.Text>
            <Button variant="primary">Go somewhere</Button>
          </Card.Body>
        </Card>
      )}
      <div>{load ? <h1>load..</h1> : <Commentlist movies={movie[i].title} />}</div>
      <div>{load ? <h1>load..</h1> : <Commentwrite title={movie[i].title} movie_id={movie[i].movie_id} />}</div>
    </div>
  );
};

export default Moviedetail;
