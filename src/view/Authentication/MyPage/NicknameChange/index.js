import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function NicknameChange(props) {
  const [nickname, setNickname] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = Cookies.get("token");
      const response = await axios.put(
        "/api/users/mypage/nickname",
        {
          nickname,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const responseMessage = response.data.message;

      if (responseMessage === "Invalid Nickname Pattern") {
        setMessage("한글로 1글자 이상 9글자 미만으로 입력해주세요.");
      } else if (responseMessage === "Nickname already in use") {
        setMessage("이미 존재하는 닉네임입니다.");
      } else if (responseMessage === "Success") {
        alert("변경이 완료되었습니다");
        navigate("/boardmain/MyPage");
      }
    } catch (error) {
      console.error(error);
      setMessage("서버 오류가 발생했습니다.");
    }
  };

  return (
    <div>
      <h1>닉네임 변경</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nickname">닉네임</label>
          <input type="text" id="nickname" value={nickname} onChange={handleNicknameChange} />
        </div>
        <Button variant="contained" type="submit">
          변경
        </Button>
      </form>
      <p>{message}</p>
    </div>
  );
}
