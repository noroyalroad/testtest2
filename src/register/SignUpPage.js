import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import axios from "axios";

function SignUpPage() {
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passwordConfirm, setPasswordConfirm] = React.useState("");

  let body = {
    username: username,
    email: email,
    password: password,
  };

  const registerUser = (event) => {
    event.preventDefault();

    if (password !== passwordConfirm) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    axios
      .post("/v1/ap/user/register", body)
      .then((res) => {
        alert("회원가입에 성공하였습니다.");
      })
      .catch((error) => {
        alert("회원가입에 실패하였습니다.");
        console.log(error);
      });
  };

  return (
    <Container className="mt-4">
      <Form onSubmit={registerUser}>
        <Form.Group>
          <Form.Label>Username: </Form.Label>
          <Form.Control type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        </Form.Group>

        <Form.Group>
          <Form.Label>Email: </Form.Label>
          <Form.Control type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </Form.Group>

        <Form.Group>
          <Form.Label>Password: </Form.Label>
          <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </Form.Group>

        <Form.Group>
          <Form.Label>Confirm Password: </Form.Label>
          <Form.Control type="password" placeholder="Confirm Password" value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} />
        </Form.Group>

        <Button variant="primary" type="submit">
          회원가입
        </Button>
      </Form>
    </Container>
  );
}

export default SignUpPage;
