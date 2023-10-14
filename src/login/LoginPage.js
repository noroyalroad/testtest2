import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import axios from 'axios';

function LoginPage() {
    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState('');
  
    const loginUser = (event) => {
      event.preventDefault();
      const body = {
        email: email,
        password: password
      };

      console.log(body);
  
      axios.post('/api/auth/login', body).then((res) => {
        localStorage.setItem('token', res.data.jwtToken);
        alert('로그인에 성공하였습니다.');
      }).catch((error) => {
        alert('로그인에 실패하였습니다.');
      });
    };
  
    return (
      <Container className="mt-4">
        <Form onSubmit={loginUser}>
          <Form.Group>
            <Form.Label>Email: </Form.Label>
            <Form.Control type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} /> 
          </Form.Group>
  
          <Form.Group>
            <Form.Label>Password: </Form.Label>
            <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
          </Form.Group>
  
          <Button variant="primary" type='submit'>
            로그인
          </Button>
        </Form>
      </Container>
    );
  }

export default LoginPage;
