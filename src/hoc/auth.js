import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { auth } from "../_actions/user_action";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function (SpecificComponent, option, adminRoute = null) {
  function AuthenticationCheck(props) {
    const dispatch = useDispatch();
    const Navigate = useNavigate();

    const token = Cookies.get("token"); // 수정: get 메서드 사용
    console.log("쿠키에 설정된 토큰:", token);

    const headers = token ? { Authorization: `Bearer ${token}` } : { Authorization: `a` }; // 토큰이 있는 경우와 없는 경우에 따라 다른 헤더 설정

    useEffect(() => {
      dispatch(auth({ headers })).then((res) => {
        if (!res.payload.isAuth) {
          if (option) alert("로그인이 필요합니다.");
          Navigate("/list");
        }
      });
    }, []);

    return <SpecificComponent />;
  }
  return AuthenticationCheck;
}
