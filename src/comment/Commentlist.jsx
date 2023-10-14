import axios from "axios";
import React, { useEffect, useState } from "react";
import Badge from "react-bootstrap/Badge";
import ListGroup from "react-bootstrap/ListGroup";
import Commentitem from "./Commentitem";
import CommentList2 from "./CommentList2";

const Commentlist = ({ movie_id }) => {
  const [comment, setcomment] = useState([]);

  useEffect(() => {
    axios
      .get(`/api/getcomment/${movie_id}`)
      .then((res) => {
        console.log(res.data);
        setcomment(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <ListGroup as="ol" numbered>
        {/* <Commentitem item={comment} /> */}
        <CommentList2 movie={comment} />
      </ListGroup>
    </div>
  );
};

export default Commentlist;
