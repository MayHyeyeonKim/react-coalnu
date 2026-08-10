import { Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate } from 'react-router-dom';

const Login = ({setAuthenticate}) => {
  const navigate = useNavigate();
    const loginUser = (event)=>{
        event.preventDefault();
        setAuthenticate(true)
        navigate("/");
    }
    return (
    <Container>
        {/**
         * 함수 호출 (loginUser(event)): 컴포넌트 렌더링 시 즉시 실행됨.(컴포넌트가 렌더링될 때 loginUser가 즉시 호출, 그 결과(만약 반환 값이 있다면)를 onSubmit에 할당하려고)
         * 함수 참조 ((event) => loginUser(event)): 폼 제출 시점에 실행됨. (폼이 제출될 때만 loginUser가 호출, 그때 비로소 event 객체가 전달)
         * 콜백함수로 함수참조해야 폼 제출 시점에서 실행: 사용자가 폼을 제출할 때 event 객체가 생성되고, 이 event 객체가 loginUser 함수에 전달됩니다.*/}
        <Form onSubmit={loginUser}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
            //   onChange={(event) => setId(event.target.value)}
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
            //   onChange={(event) => setPassword(event.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group>
          <Button variant="danger" type="submit">
            Login
          </Button>
        </Form>
    </Container>
    );
}

export default Login;