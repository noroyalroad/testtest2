import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import Footer from "../../../../footer/Footer";

export default function PasswordChange(props) {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = Cookies.get("token");
      const response = await axios.put(
        "/api/users/mypage/password",
        {
          password,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const responseMessage = response.data.message;

      if (responseMessage === "Invalid Password Pattern") {
        setMessage("비밀번호는 최소 8자 이상, 영문자와 숫자, 특수 문자를 포함해야 합니다.");
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
      <div className="head">
        <div className="header">
          <img src="/image/logo2.png" alt="로고" />
        </div>
      </div>
      <div className="passBoxW">
        <div className="passBox">
          <h3>비밀번호 변경</h3>
          <h5 class="marB_30">안전한 비밀번호로 내 정보를 보호하세요</h5>

          <form onSubmit={handleSubmit}>
            <input className="marB_20" type="password" placeholder="현재 비밀번호" />
            <input className="marB_5" type="password" id="password" placeholder="새 비밀번호" value={password} onChange={handlePasswordChange} />
            <input className="marB_50" type="password" placeholder="새 비밀번호 확인" />

            <button class="marB_10">확인</button>
            <button
              onClick={() => {
                navigate("/mypage");
              }}
            >
              이전
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}
