import axios from "axios";
import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { FaStar } from "react-icons/fa";
import RatingStar from "../etc/star/RatingStar";

const Commentwrite = (props) => {
  let { title, movie_id } = props;
  const [email, setemail] = useState("");
  const [content, setcontent] = useState("");
  const [like, setlike] = useState("");
  const [Rating, setRating] = useState(0);

  console.log(title, movie_id);

  const ARRAY = [0, 1, 2, 3, 4];

  const submit = (event) => {
    event.preventDefault();

    let body = {
      email: email,
      // comments: content,
      title: title,
      Rating: Rating,
    };
    axios
      .post("/api/addcomment", body)
      .then((res) => {
        console.log(res.data);
        if (res.data === "success!") {
          alert("작성완료");
          setemail(""); // 이메일 입력 초기화
          setcontent("");
        }
        // setemail(""); // 이메일 입력 초기화
        // setcontent("");
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(body);

    let body2 = {
      user_id: email,
      movie_id: movie_id,
      score: Rating,
    };

    axios
      .post("/api/Rating", body2)
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });

    let body3 = {
      movie_title: title,
      user_email: email,
      rating: Rating,
    };
    axios
      .post("http://192.168.0.178:5001/recommend", body3)
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  console.log(Rating);
  // const onClick = () => {
  //   setemail(""); // 이메일 입력 초기화
  //   setcontent("");
  // };

  return (
    <Form onSubmit={submit}>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="name@example.com"
          value={email}
          onChange={(event) => {
            setemail(event.target.value);
          }}
        />
        <RatingStar onRatingChange={(newRating) => setRating(newRating)} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Example textarea</Form.Label>
        <Form.Control
          as="textarea"
          value={content}
          rows={3}
          onChange={(event) => {
            setcontent(event.target.value);
          }}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        작성
      </Button>
    </Form>
  );
};

export default Commentwrite;
