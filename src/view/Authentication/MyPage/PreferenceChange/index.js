import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { MenuItem, Select } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function PreferenceChange(props) {
  const [preference_1, setPreference_1] = useState("0");
  const [preference_2, setPreference_2] = useState("0");
  const [preference_3, setPreference_3] = useState("0");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handlePreferenceChange = (e) => {
    if (e.target.name === "preference_1") {
      setPreference_1(e.target.value);
    } else if (e.target.name === "preference_2") {
      setPreference_2(e.target.value);
    } else if (e.target.name === "preference_3") {
      setPreference_3(e.target.value);
    }
  };

  const handleSubmit = async (e) => {
    // async 키워드 추가
    e.preventDefault();

    try {
      const token = Cookies.get("token");
      const response = await axios.put(
        "/api/users/mypage/preference",
        {
          preference_1,
          preference_2,
          preference_3,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const responseMessage = response.data.message;

      if (responseMessage === "Invalid Preference Pattern") {
        setMessage("선호도 패턴이 잘못되었습니다.");
      } else if (responseMessage === "Success") {
        alert("변경이 완료되었습니다");
        navigate("/boardmain/MyPage");
      } else {
        setMessage("알 수 없는 오류 발생");
      }
    } catch (error) {
      console.error(error);
      setMessage("서버 오류가 발생했습니다.");
    }
  };

  return (
    <div>
      <h1>선호도 변경</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="preference_1">선호도 1</label>
          <Select name="preference_1" value={preference_1} onChange={handlePreferenceChange}>
            <MenuItem value="0">선택</MenuItem>
            <MenuItem value="1">배우</MenuItem>
            <MenuItem value="2">감독</MenuItem>
            <MenuItem value="3">장르</MenuItem>
          </Select>
        </div>

        <div>
          <label htmlFor="preference_2">선호도 2</label>
          <Select name="preference_2" value={preference_2} onChange={handlePreferenceChange}>
            <MenuItem value="0">선택</MenuItem>
            <MenuItem value="1">배우</MenuItem>
            <MenuItem value="2">감독</MenuItem>
            <MenuItem value="3">장르</MenuItem>
          </Select>
        </div>

        <div>
          <label htmlFor="preference_3">선호도 3</label>
          <Select name="preference_3" value={preference_3} onChange={handlePreferenceChange}>
            <MenuItem value="0">선택</MenuItem>
            <MenuItem value="1">배우</MenuItem>
            <MenuItem value="2">감독</MenuItem>
            <MenuItem value="3">장르</MenuItem>
          </Select>
        </div>

        <button type="submit">변경</button>
      </form>
      <p>{message}</p>
    </div>
  );
}
