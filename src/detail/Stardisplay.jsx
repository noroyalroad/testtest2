import axios from "axios";
import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

function StarRating2({ rating, onStarClick, user_id, movie_id }) {
  const maxStars = 5;
  const yellowStars = rating;

  const handleStarClick = (starIndex) => {
    // 클릭한 별의 인덱스를 전달하여 rating을 업데이트
    onStarClick(starIndex + 1);
  };

  const onClick = () => {
    let body = {
      user_email: user_id,
      movie_id: movie_id,
      score: rating,
    };

    axios
      .post("/api/Rating", body)
      .then((res) => {
        if (res.data) {
          console.log(res.data);
          alert("별점이 등록되었습니다.");
          axios
            .post("http://52.79.68.204:5001/recommend", body)
            .then((res) => {
              if (res.data) {
                console.log(res.data);
                alert("추천 영화가 등록되었습니다.");
              }
            })
            .catch((error) => {
              console.log(error);
            });
        }
      })
      .catch((error) => {
        console.log(error);
      });

    console.log(body);
  };

  return (
    <div>
      {Array.from({ length: maxStars }).map((_, index) => (
        <FaStar className="cuP" key={index} color="#ffc107" size={24} onClick={() => handleStarClick(index)} style={{ color: index < yellowStars ? "yellow" : "gray" }}>
          &#9733; {/* 별 이모지 */}
        </FaStar>
      ))}
      <p className="marL_10">별점: {rating} / 5</p>
      <button className="btn" onClick={onClick}>
        별점주기
      </button>
    </div>
  );
}

export default StarRating2;
