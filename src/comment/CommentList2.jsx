import axios from "axios";
import React, { useState } from "react";

function CommentList2({ movie }) {
  const [likes, setlike] = useState("like");
  const [likedComments, setLikedComments] = useState({});

  const like = (id, index) => {
    let cnt = 0;

    cnt = cnt + 1;

    if (likedComments[id] === 3) {
      alert("한 댓글에 좋아요는 세 번만 누를 수 있습니다!");
      return;
    }
    console.log(id, index);
    axios
      .post(`/api/comment/likes/${id}`)
      .then((res) => {
        console.log(res.data);
        if (res.data === "success!") {
          const updatedItem = [...movie];
          updatedItem[index].likes = updatedItem[index].likes + 1;
          setLikedComments((prevLikedComments) => ({
            ...prevLikedComments,
            [id]: (prevLikedComments[id] || 0) + 1,
          }));

          //화면에 즉각 반영하기
          setlike(updatedItem);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <ul className="commentList">
      {movie.map((item, index) => {
        return (
          <li key={item.comment_id}>
            <div className="comment-meta">
              <div className="comment-nickname-date">
                <span>{item.nickname}</span> | <span>{item.update_time}</span>
              </div>
              <button
                className="like-button"
                onClick={() => {
                  like(item.comment_id, index);
                }}
              >
                👍 {item.likes === 0 ? "like" : item.likes}
              </button>
            </div>
            <div className="comment-content">{item.comments}</div>
          </li>
        );
      })}
      {/* <li>
        <div className="comment-meta">
          <div className="comment-nickname-date">
            <span>김현</span> | <span>2023.10.06</span>
          </div>
          <button className="like-button">👍 Like</button>
        </div>
        <div className="comment-content">박동선 일 좀 해라!!!!🤬</div>
      </li> */}
    </ul>
  );
}

export default CommentList2;