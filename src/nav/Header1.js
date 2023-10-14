import React from "react";
import { Navbar, Nav, Button, Container, FormControl, Form, InputGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandBackFist, faFaceLaugh, faFaceGrimace, faHeart } from "@fortawesome/free-regular-svg-icons";
import { faGun, faTv, faFrog, faStar, faFile, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import Search from "./Search";

function Header() {
  const nav = useNavigate();
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
              <Button variant="outline-success">login</Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Navbar bg="" expand="lg" style={{ borderBottom: "2px solid green" }}>
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="center-collapse">
            <Nav className="center">
              <Nav.Link href="#home">
                <FontAwesomeIcon icon={faThumbsUp} />
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

export default Header;
