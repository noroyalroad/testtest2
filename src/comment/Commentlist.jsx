import axios from "axios";
import React, { useEffect, useState } from "react";
import Badge from "react-bootstrap/Badge";
import ListGroup from "react-bootstrap/ListGroup";
import Commentitem from "./Commentitem";
import CommentList2 from "./CommentList2";
import Paging from "../paging/Paging";

const Commentlist = ({ movie_id }) => {
  const [comment, setcomment] = useState([]);
  const [total, settotal] = useState(0);
  const [page, setpage] = useState(1);

  useEffect(() => {
    axios
      .get(`/api/comment/${movie_id}?pageNo=${page}`)
      .then((res) => {
        console.log(res.data);
        setcomment(res.data.comment);
        settotal(res.data.totalcout);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [movie_id, page]);

  const handlePageChange = (newPage) => {
    // Update the pageNo state when a page is clicked
    setpage(newPage);
  };

  return (
    <div>
      <ListGroup as="ol" numbered>
        {/* <Commentitem item={comment} /> */}
        <CommentList2 movie={comment} />

        {comment.length === 0 ? <div>현재 작성 된 댓글이 없습니다.</div> : <Paging totalcount={total} onPageChagne={handlePageChange} />}
      </ListGroup>
    </div>
  );
};

export default Commentlist;
