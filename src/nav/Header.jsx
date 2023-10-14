import React, { useEffect, useState } from "react";
import { Navbar, Nav, Button, Container, FormControl, Form, InputGroup, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandBackFist, faFaceLaugh, faFaceGrimace, faHeart } from "@fortawesome/free-regular-svg-icons";
import { faGun, faTv, faFrog, faStar, faFile, faThumbsUp, faUser } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import Search from "./Search";
import Auth from "../hoc/auth";
import { useSelector } from "react-redux";
// import { get } from "http";

function Header() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const [nickname, setNickname] = useState("");
  const [role, setRole] = useState(null);
  const nav = useNavigate();

  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const navigate = useNavigate();

  const user = useSelector((state) => state.user);

  useEffect(() => {
    console.log(Cookies.get("token"));
    const token = Cookies.get("token"); // 수정: get 메서드 사용
    // console.log("쿠키에 설정된 토큰:", token);

    if (token !== undefined) {
      // 수정: undefined를 확인
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
    if (user !== undefined && user.userData !== undefined) {
      setNickname(user.userData.nickname);
      setRole(user.userData.role);
    }
  }, [user]);

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleLogout = () => {
    // 로그아웃 로직을 처리하고 토큰값을 제거합니다.
    // localStorage.removeItem("token");
    console.log(Cookies.get("token"));
    // Cookies.set("token", undefined);
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    // sessionStorage.removeItem("token");

    setIsLoggedIn(false);
    window.location.reload();
  };

  return (
    <div>
      <Navbar bg="" expand="lg" className="webSize">
        <Container>
          <Link to="/list">
            <Navbar.Brand>
              <img src="/image/logo2.png" alt="Logo" />
            </Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="rigth">
            <Nav className="ml-auto">
              <Search />
              {!isLoggedIn ? (
                <Button variant="outline-success" onClick={handleLoginClick}>
                  Login
                </Button>
              ) : (
                <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                  <DropdownToggle className="greenButton">
                    <FontAwesomeIcon icon={faUser} />
                  </DropdownToggle>
                  <DropdownMenu className="drop">
                    {role !== "1" && (
                      <DropdownItem
                        onClick={() => {
                          nav(`/mypage`);
                        }}
                      >
                        Mypage
                      </DropdownItem>
                    )}
                    {role === "1" && (
                      <DropdownItem
                        onClick={() => {
                          nav("/mypage");
                        }}
                      >
                        관리자페이지
                      </DropdownItem>
                    )}
                    <DropdownItem onClick={handleLogout}>로그아웃</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Navbar bg="" expand="lg" style={{ borderBottom: "2px solid green" }}>
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="center-collapse">
            <Nav className="center">
              <Nav.Link>
                <FontAwesomeIcon icon={faThumbsUp} activeClassName="onActive" />
                오영추
              </Nav.Link>
              <Nav.Link
                onClick={() => {
                  const a = "액션";
                  nav(`/movies/list/${a}`);
                }}
              >
                <FontAwesomeIcon icon={faHandBackFist} />
                액션
              </Nav.Link>
              <Nav.Link
                onClick={() => {
                  const a = "애니메이션";
                  nav(`/movies/list/${a}`);
                }}
              >
                <FontAwesomeIcon icon={faFrog} />
                애니메이션
              </Nav.Link>
              <Nav.Link
                onClick={() => {
                  const a = "공포 스릴러";
                  nav(`/movies/list/${a}`);
                }}
              >
                <FontAwesomeIcon icon={faFaceGrimace} />
                공포|스릴러
              </Nav.Link>
              <Nav.Link
                onClick={() => {
                  const a = "범죄";
                  nav(`/movies/list/${a}`);
                }}
              >
                <FontAwesomeIcon icon={faGun} />
                범죄
              </Nav.Link>
              <Nav.Link
                onClick={() => {
                  const a = "코미디";
                  nav(`/movies/list/${a}`);
                }}
              >
                <FontAwesomeIcon icon={faFaceLaugh} />
                코미디
              </Nav.Link>
              <Nav.Link
                onClick={() => {
                  const a = "로맨스";
                  nav(`/movies/list/${a}`);
                }}
              >
                <FontAwesomeIcon icon={faHeart} />
                로맨스
              </Nav.Link>
              <Nav.Link
                onClick={() => {
                  const a = "멜로 드라마";
                  nav(`/movies/list/${a}`);
                }}
              >
                <FontAwesomeIcon icon={faTv} />
                멜로|드라마
              </Nav.Link>
              <Nav.Link
                onClick={() => {
                  const a = "기타";
                  nav(`/movies/list/${a}`);
                }}
              >
                <FontAwesomeIcon icon={faFile} />
                기타
              </Nav.Link>
              <Nav.Link href="#link">
                <FontAwesomeIcon icon={faStar} />찜
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Auth(Header);
